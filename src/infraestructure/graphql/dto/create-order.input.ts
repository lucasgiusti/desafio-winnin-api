import { InputType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsInt, Min, IsArray, ValidateNested } from 'class-validator';
import { CreateOrderItemInput } from './create-order-item.input';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'O id do usuário é obrigatório' })
  @IsNumber({}, { message: 'O id do usuário deve ser um número' })
  @IsInt({ message: 'O id do usuário deve ser um número inteiro' })
  @Min(1, { message: 'O id do usuário deve ser maior ou igual a 1' })
  user_id: number;

  @Field(() => [CreateOrderItemInput])
  @IsNotEmpty({ message: 'Os itens da ordem são obrigatórios' })
  @IsArray({ message: 'Os itens da ordem devem ser um array' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemInput)
  items: CreateOrderItemInput[];
}
