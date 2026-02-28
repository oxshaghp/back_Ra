import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
    const { projectId, ...reviewData } = createReviewDto;

    // Verify project belongs to user
    const project = await this.projectsRepository.findOne({
      where: { id: projectId, userId: user.id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const review = this.reviewsRepository.create({
      ...reviewData,
      projectId,
    });

    return this.reviewsRepository.save(review);
  }

  async findAllByProject(projectId: string, user: User): Promise<Review[]> {
    // Verify project belongs to user
    const project = await this.projectsRepository.findOne({
      where: { id: projectId, userId: user.id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.reviewsRepository.find({
      where: { projectId },
    });
  }

  async findOne(id: string, user: User): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    // Check if review's project belongs to the user
    if (review.project.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to access this review');
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, user: User): Promise<Review> {
    const review = await this.findOne(id, user);

    Object.assign(review, updateReviewDto);
    return this.reviewsRepository.save(review);
  }

  async delete(id: string, user: User): Promise<void> {
    const review = await this.findOne(id, user);
    await this.reviewsRepository.delete(review.id);
  }
}
