import { IsEmail, IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator'; 

export class SignupAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['manager', 'user']) // Validates the role
  role: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;
}

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
