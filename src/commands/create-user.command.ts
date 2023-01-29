import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { UsersService } from 'users/users.service';
import { CreateUserAnswers, CreateUserQuestions } from './questions/create-user.questions';

@Command({ name: 'create-user', description: 'Create new user' })
export class CreateUserCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService, private readonly usersService: UsersService) {
    super();
  }

  async run(): Promise<void> {
    const { email, password } = await this.inquirer.ask<CreateUserAnswers>(
      CreateUserQuestions.getQuestionSetName(),
      undefined,
    );

    await this.usersService.create({ email, password }, { hashPassword: true });

    console.log(`User with email "${email}" is successfully created!`);
  }
}
