import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, _: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue as T;
    } catch (_) {
      throw new BadRequestException('Validation failed');
    }
  }
}
