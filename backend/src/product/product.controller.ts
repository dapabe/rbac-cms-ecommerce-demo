import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ZodPipe } from 'src/common/ZodValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/common/guards/role.guard';
import {
  CoercedIntegerSchema,
  UserRole,
  IProductDTO,
  ProductDTOSchema,
} from '@mono/shared';

@Controller('content')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly contentService: ProductService) {}

  @Post()
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  @UsePipes(new ZodPipe(ProductDTOSchema.Create))
  create(@Body() createContentDto: IProductDTO['Create']) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll(@Query('includeAll') includeAll?: string) {
    return this.contentService.findAll(includeAll === 'true');
  }

  @Get(':id')
  findOne(@Param('id', new ZodPipe(CoercedIntegerSchema)) id: number) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  @UsePipes(new ZodPipe(ProductDTOSchema.Update))
  update(
    @Param('id', new ZodPipe(CoercedIntegerSchema)) id: number,
    @Body() updateContentDto: IProductDTO['Update'],
  ) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  remove(
    @Param('id', new ZodPipe(CoercedIntegerSchema))
    id: number,
  ) {
    return this.contentService.remove(id);
  }
}
