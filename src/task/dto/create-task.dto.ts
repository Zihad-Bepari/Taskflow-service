import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'complete'], {
    message: 'validation status required',
  })
  status: 'pending' | 'in-progress' | 'complete';

  @IsOptional()
  @IsDateString()
  dueDate?: Date | null;
  
  @IsOptional()
  assignedDate: Date;

  @IsNumber()
  assignedToUserId: number;

  @IsString()
  @IsOptional()
  assignedToUserName: string;
}
