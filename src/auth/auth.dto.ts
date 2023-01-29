import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginOutput {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  accessToken: string;
}
