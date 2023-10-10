import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [AuthModule, UserModule, CategoryModule, ItemModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
