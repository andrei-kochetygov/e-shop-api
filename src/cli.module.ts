import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { GenerateEncryptionKeyCommand } from 'commands/generate-encryption-key.command';
import { CreateUserQuestions } from 'commands/questions/create-user.questions';
import { CreateUserCommand } from 'commands/create-user.command';
import { EnvService } from 'env.service';
import { LiteralParsingService } from 'parsers/literal-parsing.service';
import { UsersService } from 'users/users.service';
import { PasswordsService } from 'passwords/passwords.service';
import { CreateDatabaseCommand } from 'commands/create-database.command';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [
    EnvService,
    LiteralParsingService,
    UsersService,
    PasswordsService,
    GenerateEncryptionKeyCommand,
    CreateUserQuestions,
    CreateUserCommand,
    CreateDatabaseCommand,
  ],
})
export class CommandLineInterfaceModule {}
