import { Param, Get, UseGuards, HttpCode, Controller } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { omit } from 'lodash';
import { User } from './users.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 401 })
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const userId = parseInt(id);

    const user = await this.usersService.findOne({ id: userId });

    return omit(user, ['password']);
  }
}
