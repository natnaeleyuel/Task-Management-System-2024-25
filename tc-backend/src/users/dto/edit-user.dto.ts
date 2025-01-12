import { IsEmail, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class EditUserDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(2, { message: 'Firstname must be at least 2 characters' })
    @MaxLength(50, { message: 'Firstname cannot be longer than 50 characters' })
    @IsOptional()
    firstname?: string;

    @IsString()
    @MinLength(2, { message: 'Lastname must be at least 2 characters' })
    @MaxLength(50, { message: 'Lastname cannot be longer than 50 characters' })
    @IsOptional()
    lastname?: string;

    @IsString()
    @IsOptional()
    groupId?: string;
}
