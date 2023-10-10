import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Response } from 'interface/Respose';
import { Category as CategoryEntity } from '@prisma/client';

@Injectable()
export class CategoryService implements Category {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Response> {
    try {
      const isExist = await this.prismaService.category.findFirst({
        where: {
          name: createCategoryDto.name,
        },
      });

      if (isExist) {
        throw new BadRequestException('Category already exist');
      }

      const category = await this.prismaService.category.create({
        data: {
          name: createCategoryDto.name,
          parentCategory: {
            connect: {
              id: createCategoryDto.parentId,
            },
          },
        },
      });

      return {
        message: 'Category created successfully',
        success: true,
        data: category,
      };
    } catch (error) {
      new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Array<CategoryEntity>> {
    try {
      return await this.prismaService.category.findMany();
    } catch (error) {
      new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          id,
        },
      });
      if (!category) {
        throw new BadRequestException('Category not found');
      }
      return category;
    } catch (error) {
      new BadRequestException(error.message);
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<Response> {
    return {
      message: `This action updates a #${updateCategoryDto.id} category`,
      success: true,
    };
  }

  async remove(id: string): Promise<Response> {
    return {
      message: `This action removes a ${id} category`,
      success: true,
    };
  }
}
