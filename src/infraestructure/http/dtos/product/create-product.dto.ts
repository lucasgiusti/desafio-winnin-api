import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min, Matches } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Produto 1' })
    @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
    @IsString({ message: 'O nome do produto deve ser uma string' })
    name: string;

    @ApiProperty({ example: 10.99 })
    @IsNotEmpty({ message: 'O preço do produto é obrigatório' })
    @IsNumber({
      maxDecimalPlaces: 2
    }, { message: 'O preço do produto deve ser um número com no máximo 2 casas decimais' })
    price: number;

    @ApiProperty({ example: 10 })
    @IsNotEmpty({ message: 'O estoque do produto é obrigatório' })
    @IsNumber({},{ message: 'O estoque do produto deve ser um número' })
    @IsInt({ message: 'O estoque do produto deve ser um número inteiro' })
    @Min(0, { message: 'O estoque do produto deve ser maior ou igual a 0' })
    stock: number;
}