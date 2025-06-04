import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ContentType {
  ARTICLE = 'article',
  PAGE = 'page',
  POST = 'post',
}

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity()
export class EntityContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ unique: true })
  slug: string;

  @Column({
    type: 'simple-enum',
    enum: ContentType,
    default: ContentType.ARTICLE,
  })
  type: ContentType;

  @Column({
    type: 'simple-enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
  })
  status: ContentStatus;

  @Column({ nullable: true })
  featuredImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
