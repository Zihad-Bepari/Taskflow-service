import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, PrismaClient, TaskStatus } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaClient) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: TaskStatus.pending,
        assignedDate: createTaskDto.assignedDate || new Date(),
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
        assignedToUserId: createTaskDto.assignedToUserId,
        assignedToUserName: createTaskDto.assignedToUserName,
      },
    });
  }

  // Get all tasks
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  // Get a single task by ID
  async findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id: id },
    });
  }

  // Update a task by ID
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task | { message: string }> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      return { message: 'Task not found' };
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title ?? task.title,
        description: updateTaskDto.description ?? task.description,
        status: TaskStatus.pending,
        assignedDate: new Date(),
        dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : task.dueDate,
        assignedToUserId: updateTaskDto.assignedToUserId ?? task.assignedToUserId,
        assignedToUserName: updateTaskDto.assignedToUserName ?? task.assignedToUserName,
      },
    });
  }

  // Delete a task by ID
  async remove(id: number): Promise<{ message: string }> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      return { message: 'Task not found' };
    }

    await this.prisma.task.delete({ where: { id } });
    return { message: 'Task deleted successfully' };
  }
}
