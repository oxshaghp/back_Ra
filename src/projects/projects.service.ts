import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    file: Express.Multer.File,
    user: User,
  ): Promise<Project> {
    const projectData: any = {
      ...createProjectDto,
      userId: user.id,
    };

    // Handle uploaded file
    if (file) {
      projectData.imageUrl = `/uploads/${file.filename}`;
    }

    // Parse tags from JSON string
    if (createProjectDto.tags) {
      try {
        projectData.tags = JSON.parse(createProjectDto.tags);
      } catch (error) {
        projectData.tags = [];
      }
    }

    const project = this.projectsRepository.create(projectData);
    const savedProject = await this.projectsRepository.save(project);
    return savedProject as unknown as Project;
  }

  async findAll(user: User): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { userId: user.id },
      relations: ['reviews'],
    });
  }

  async findOne(id: string, user: User): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id, userId: user.id },
      relations: ['reviews'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    file: Express.Multer.File,
    user: User,
  ): Promise<Project> {
    const project = await this.findOne(id, user);

    const updateData: any = { ...updateProjectDto };

    // Handle uploaded file
    if (file) {
      updateData.imageUrl = `/uploads/${file.filename}`;
    }

    // Parse tags from JSON string
    if (updateProjectDto.tags) {
      try {
        updateData.tags = JSON.parse(updateProjectDto.tags);
      } catch (error) {
        updateData.tags = project.tags || [];
      }
    }

    Object.assign(project, updateData);
    const savedProject = await this.projectsRepository.save(project);
    return savedProject as unknown as Project;
  }

  async delete(id: string, user: User): Promise<void> {
    const project = await this.findOne(id, user);
    await this.projectsRepository.delete(project.id);
  }
}
