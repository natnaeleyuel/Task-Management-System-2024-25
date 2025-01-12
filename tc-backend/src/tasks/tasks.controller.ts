import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, EditTaskDto } from './dto';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
  ) {}

  // Create a new task
  @Post()
  createTask(
    @GetUser('id') userId: number,
    @Body() dto: CreateTaskDto,
    @Req() req,
  ) {
    if(req.userRole == 'user'){
      throw new ForbiddenException('A user can not create tasks');
    }
    else{
      return this.tasksService.createTask(userId, dto);
    }
  }

  // Get tasks for the logged-in user
  @Get()
  getUserTasks(@GetUser('id') userId: number, @GetUser('role') role: string) {
    return this.tasksService.getTasksForUser(userId);
  }

  @Get('group/:groupId')
  getGroupTasks(@Param('groupId') groupId: number) {
    return this.tasksService.getTasksForGroup(groupId);
  }

  // Get a specific task by its ID for a user
  @Get(':id')
  getTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasksService.getTaskById(userId, taskId);
  }

  // Edit a task by its ID
  @Patch(':id')
  editTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: EditTaskDto,
  ) {
    return this.tasksService.editTaskById(userId, taskId, dto);
  }

  // Delete a task by its ID
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.tasksService.deleteTaskById(userId, taskId);
  }
}
