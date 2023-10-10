import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
