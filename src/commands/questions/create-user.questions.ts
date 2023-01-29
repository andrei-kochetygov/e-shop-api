import { QuestionSet, Question } from 'nest-commander';

const name = 'create-user-questions';

export type CreateUserAnswers = {
  email: string;
  password: string;
};

@QuestionSet({ name })
export class CreateUserQuestions {
  static getQuestionSetName() {
    return name;
  }

  @Question({
    type: 'input',
    name: 'email',
    message: "What's user email?",
  })
  parseEmail(email: string) {
    return email;
  }

  @Question({
    type: 'password',
    name: 'password',
    message: "What's user password?",
  })
  parsePassword(password: string) {
    return password;
  }
}
