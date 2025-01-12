import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, EditTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasksForUser(userId: number) {
    return this.prisma.task.findMany({
      where: {
        group: {
          members: {  
            some: {
              id: userId,  
            },
          },
        },
      },
      include: {
        group: true, 
      },
    });
  }
  
  async getTasksForGroup(groupId: number) {
    return this.prisma.task.findMany({
      where: { groupId },
      include: { group: true, assignedUsers: true },
    });
  }

  async getTaskById(taskId: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { user: true }, // Ensure userId is available
    });
  
    if (!task || (task.userId && task.userId !== userId)) {
      throw new ForbiddenException('Not allowed to access this task');
    }
  
    return task;
  }
  
  async createTask(userId: number, dto: CreateTaskDto) {
    console.log(`Creating task for user ${userId}`);

    const GroupId =  parseInt(dto.groupId)
  
    // Convert the dueDate string into a Date object
    const task = await this.prisma.task.create({
      data: {
        userId,  
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        dueDate: new Date(dto.dueDate),  
        groupId: GroupId, 
        assignedUsers: {
          connect: [] 
        },
      },
    });

    const usersInGroup = await this.prisma.user.findMany({
      where: {
        groupId: GroupId,
        role: {not: 'manager'}
      }
    });

    await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        assignedUsers: {
          connect: usersInGroup.map(user => ({ id: user.id })),  // Connect task to users
        },
      },
    });
  
    console.log(`Task created: ${task.id}`);
    return task;
  }
  
  
  // Edit a task by its ID for a specific user
  async editTaskById(userId: number, taskId: number, dto: EditTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    // Check if the user owns the task
    if (!task || task.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.task.update({
      where: { id: taskId },
      data: { ...dto },
    });
  }

  // Delete a task by its ID for a specific user
  async deleteTaskById(userId: number, taskId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    // Check if the user owns the task
    if (!task || task.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.task.delete({
      where: { id: taskId },
    });
  }
}
