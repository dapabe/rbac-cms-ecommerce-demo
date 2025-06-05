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
import { ContentService } from './content.service';
import { ContentDTO, ContentDTOSchema } from './dto/content.dto';
import { ZodValidationPipe } from 'src/common/ZodValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/common/guards/role.guard';
import { CoercedIntegerSchema, UserRole } from '@mono/shared';

@Controller('content')
@UseGuards(AuthGuard('jwt'))
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  @UsePipes(new ZodValidationPipe(ContentDTO.Create))
  create(@Body() createContentDto: ContentDTOSchema['Create']) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll(@Query('includeAll') includeAll?: string) {
    return this.contentService.findAll(includeAll === 'true');
  }

  @Get(':id')
  findOne(
    @Param('id', new ZodValidationPipe(CoercedIntegerSchema)) id: number,
  ) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  @UsePipes(new ZodValidationPipe(ContentDTO.Update))
  update(
    @Param('id', new ZodValidationPipe(CoercedIntegerSchema)) id: number,
    @Body() updateContentDto: ContentDTOSchema['Update'],
  ) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard([UserRole.ADMIN]))
  remove(
    @Param('id', new ZodValidationPipe(CoercedIntegerSchema))
    id: number,
  ) {
    return this.contentService.remove(id);
  }
}
