import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrderType } from './order.type';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  created_at: Date;

  @Field(() => [OrderType], { nullable: true })
  orders?: OrderType[];
}
