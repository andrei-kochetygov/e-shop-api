import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordsService } from 'passwords/passwords.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PasswordsService],
})
export class UsersModule {}
