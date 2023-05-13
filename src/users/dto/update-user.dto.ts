import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '6457bf8d33ad4bcbe4265260',
    description: 'id',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'hello@gmail.com',
    description: 'email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'adam',
    description: 'name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'qwe123qwe123',
    description: 'password',
    required: false,
  })
  @IsString()
  @IsOptional()
  password: string;
}
