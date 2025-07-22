import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Min, Matches, IsInt } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @Field(() => Float)
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @IsNumber({
    maxDecimalPlaces: 2
  }, { message: 'O preço deve ser um número com no máximo 2 casas decimais' })
  price: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'O estoque é obrigatório' })
  @IsNumber({}, { message: 'O estoque deve ser um número' })
  @IsInt({ message: 'O estoque deve ser um número inteiro' })
  @Min(1, { message: 'O estoque deve ser maior ou igual a 1' })
  stock: number;
}
