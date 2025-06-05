import { z } from 'zod';
import { ContentStatus, ContentType } from '../entities/content.entity';
import { IndexedClassDTO } from '@mono/shared';

export class ContentDTO {
  static Read = z.object({
    id: z.number().int(),
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(5000),
    summary: z.string().max(500).optional(),
    slug: z.string().min(1).max(100),
    type: z.nativeEnum(ContentType),
    status: z.nativeEnum(ContentStatus),
    featuredImage: z.string().url().optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  });
  static Create = ContentDTO.Read.pick({
    title: true,
    content: true,
    summary: true,
    slug: true,
    type: true,
    status: true,
    featuredImage: true,
  });
  static Update = ContentDTO.Create.partial().extend({
    id: z.number().int(),
  });
}

export type ContentDTOSchema = IndexedClassDTO<typeof ContentDTO>;
