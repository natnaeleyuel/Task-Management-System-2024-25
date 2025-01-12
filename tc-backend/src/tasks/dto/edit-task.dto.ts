import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class EditTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['high', 'medium', 'low']) // Optional validation for priority
  priority?: string;

  @IsOptional()
  @IsDateString() // Ensures that dueDate is a valid date string
  dueDate?: string;
}
