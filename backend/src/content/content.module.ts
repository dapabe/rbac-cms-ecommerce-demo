import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityContent } from './entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityContent])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
