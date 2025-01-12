import { Injectable, NotFoundException } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async editUser(userId: number, dto: EditUserDto) {
    // Find the user first to ensure they exist
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // If the user does not exist, throw an error
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const GroupId = dto.groupId ? parseInt(dto.groupId, 10) : undefined;

    // Update only the provided fields
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
          ...(dto.email ? { email: dto.email } : {}),
          ...(dto.firstname ? { firstname: dto.firstname } : {}),
          ...(dto.lastname ? { lastname: dto.lastname } : {}),
          ...(GroupId ? { groupId: GroupId } : {}),
      },
  });

    // Remove the password field for security reasons
    delete updatedUser.password;

    return updatedUser;
  }
}
