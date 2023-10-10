import { Response } from 'interface/Respose';
import { CreateCategoryDto } from './../dto/create-category.dto';
import { Category as CategoryEntity } from '@prisma/client';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export interface Category {
  create(createCategoryDto: CreateCategoryDto): Promise<Response>;
  findAll(): Promise<Array<CategoryEntity>>;
  findOne(id: string): Promise<CategoryEntity>;
  update(updateCategoryDto: UpdateCategoryDto): Promise<Response>;
  remove(id: string): Promise<Response>;
}
