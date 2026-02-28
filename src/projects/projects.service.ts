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

  async create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      userId: user.id,
    });
    return this.projectsRepository.save(project);
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
    user: User,
  ): Promise<Project> {
    const project = await this.findOne(id, user);

    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async delete(id: string, user: User): Promise<void> {
    const project = await this.findOne(id, user);
    await this.projectsRepository.delete(project.id);
  }
}
