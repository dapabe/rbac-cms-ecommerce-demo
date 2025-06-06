import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z, ZodSchema } from 'zod';

export class ZodPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  transform(value: unknown, _: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue as unknown as z.infer<typeof this.schema>;
    } catch (_) {
      throw new BadRequestException('Validation failed');
    }
  }
}
