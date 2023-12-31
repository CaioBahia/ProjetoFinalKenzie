import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/user.repository';
// import { UsersInMemoryRepository } from './repositories/in-memory/user.in-memory.repository';
import { UsersPrismaRepository } from './repositories/prisma/users-prisma.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
