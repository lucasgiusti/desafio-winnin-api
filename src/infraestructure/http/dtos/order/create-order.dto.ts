import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, Min, ValidateNested } from "class-validator";

export class CreateOrderItemDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: 'O id do produto é obrigatório' })
    @IsNumber({},{ message: 'O id do produto deve ser um número' })
    @IsInt({ message: 'O id do produto deve ser um número inteiro' })
    @Min(1, { message: 'O id do produto deve ser maior ou igual a 1' })
    product_id: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: 'A quantidade do produto é obrigatória' })
    @IsNumber({},{ message: 'A quantidade do produto deve ser um número' })
    @IsInt({ message: 'A quantidade do produto deve ser um número inteiro' })
    @Min(1, { message: 'A quantidade do produto deve ser maior ou igual a 1' })
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: 'O id do usuário é obrigatório' })
    @IsNumber({},{ message: 'O id do usuário deve ser um número' })
    @IsInt({ message: 'O id do usuário deve ser um número inteiro' })
    @Min(1, { message: 'O id do usuário deve ser maior ou igual a 1' })
    user_id: number;

    @ApiProperty({ example: [{ product_id: 1, quantity: 1 }], type: [CreateOrderItemDto] })
    @IsNotEmpty({ message: 'Os itens da ordem são obrigatórios' })
    @IsArray({ message: 'Os itens da ordem devem ser um array' })
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}
