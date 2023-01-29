import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import { UserCreateOptions } from './users.types';
import { PasswordsService } from 'passwords/passwords.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService, private passwordsService: PasswordsService) {}

  async create(
    { password: sourcePassword, ...data }: Prisma.UserCreateInput,
    options?: UserCreateOptions,
  ): Promise<User> {
    const password = options?.hashPassword ? await this.passwordsService.hash(sourcePassword) : sourcePassword;

    return this.prismaService.user.create({ data: { ...data, password } });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prismaService.user.findUnique({ where });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Omit<Prisma.UserUpdateInput, 'password'>): Promise<User> {
    return this.prismaService.user.update({ where, data });
  }

  delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({ where });
  }
}
