import { Injectable } from '@nestjs/common';
import { ContentDTOSchema } from './dto/content.dto';
import { ContentStatus, EntityContent } from './entities/content.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(EntityContent)
    private contentRepo: Repository<EntityContent>,
    // private staticGeneratorService: StaticGeneratorService,
  ) {}

  async findAll(includeAll = false) {
    const whereCondition = includeAll
      ? {}
      : { status: ContentStatus.PUBLISHED };

    return this.contentRepo.find({
      where: whereCondition,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    return this.contentRepo.findOne({ where: { id } });
  }

  async findBySlug(slug: string) {
    return this.contentRepo.findOne({
      where: { slug, status: ContentStatus.PUBLISHED },
    });
  }

  async create(contentData: Partial<ContentDTOSchema['Create']>) {
    const content = this.contentRepo.create(contentData);
    const savedContent = await this.contentRepo.save(content);

    // Regenerate static JSON after creating content
    // await this.staticGeneratorService.generateContentJSON();

    return savedContent;
  }

  async update(id: number, contentData: Partial<ContentDTOSchema['Update']>) {
    await this.contentRepo.update(id, contentData);
    const updatedContent = await this.findOne(id);

    // Regenerate static JSON after updating content
    // await this.staticGeneratorService.generateContentJSON();

    return updatedContent;
  }

  async remove(id: number) {
    const result = await this.contentRepo.delete(id);

    // Regenerate static JSON after deleting content
    // await this.staticGeneratorService.generateContentJSON();

    return result;
  }
}
