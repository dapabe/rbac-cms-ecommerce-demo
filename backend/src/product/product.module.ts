import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityProduct } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityProduct])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ContentModule {}
