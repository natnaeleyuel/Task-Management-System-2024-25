import { IsNotEmpty, IsString, IsDateString, IsIn, IsNumberString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    @IsIn(['high', 'medium', 'low']) // Restricting the priority to specific values
    priority: string;
  
    @IsNotEmpty()
    @IsDateString()
    dueDate: string;
  
    @IsNotEmpty()
    @IsNumberString()
    groupId: string;  // Ensure groupId is passed
  }
  