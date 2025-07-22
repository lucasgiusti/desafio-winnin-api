import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Nome do usuário' })
    @IsNotEmpty({ message: 'O nome do usuário é obrigatório' })
    @IsString({ message: 'O nome do usuário deve ser uma string' })
    name: string;

    @ApiProperty({ example: 'Email do usuário' })
    @IsNotEmpty({ message: 'O email do usuário é obrigatório' })
    @IsString({ message: 'O email do usuário deve ser uma string' })
    email: string;
}