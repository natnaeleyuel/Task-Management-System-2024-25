import { Body, Controller, Get, Patch, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // /users/me
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  // Update user information
  @Patch()
  @HttpCode(HttpStatus.OK)
  async editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    try {
      const updatedUser = await this.usersService.editUser(userId, dto);
      return { message: 'User updated successfully', data: updatedUser };
    } catch (error) {
      throw error; 
    }
  }
}
