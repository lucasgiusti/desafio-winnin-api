import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsInt, Min } from 'class-validator';

@InputType()
export class CreateOrderItemInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'O id do produto é obrigatório' })
  @IsNumber({}, { message: 'O id do produto deve ser um número' })
  @IsInt({ message: 'O id do produto deve ser um número inteiro' })
  @Min(1, { message: 'O id do produto deve ser maior ou igual a 1' })
  product_id: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'A quantidade do produto é obrigatória' })
  @IsNumber({}, { message: 'A quantidade do produto deve ser um número' })
  @IsInt({ message: 'A quantidade do produto deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade do produto deve ser maior ou igual a 1' })
  quantity: number;
}
