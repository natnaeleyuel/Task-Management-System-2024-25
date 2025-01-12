import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/CreateGroup.dto';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async createGroup(userId: number, dto: CreateGroupDto) {
    // Check if the user is already managing a group
    const existingManager = await this.prisma.group.findUnique({
      where: { managerId: userId },
    });

    if (existingManager) {
      throw new ForbiddenException('You can only manage one group.');
    }

    // Create a new group
    return this.prisma.group.create({
      data: {
        name: dto.name,
        manager: {
          connect: { id: userId }, // Connect the user as the manager
        },
      },
    });
  }
}
