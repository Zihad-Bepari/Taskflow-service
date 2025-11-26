import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto) {
    const {
      title,
      description,
      status,
      dueDate,
      assignedToUserId,
      assignedToUserName,
      assignedDate,  
    } = createTaskDto;

    const newTask: Task = {
      id: this.idCounter++,
      title,
      description,
      status: status || 'pending',
      dueDate: dueDate ? new Date(dueDate) : null,
      assignedDate: assignedDate ? new Date(assignedDate) : new Date(),  // <-- FIXED
      assignedToUserId,
      assignedToUserName,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return { message: 'Task not found' };
    }

    Object.assign(task, updateTaskDto);
    return task;
  }

  remove(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return { message: 'Task not found' };
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);
    return { message: 'Task deleted successfully' };
  }
}
