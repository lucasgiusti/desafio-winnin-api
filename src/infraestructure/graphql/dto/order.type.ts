import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { OrderItemType } from './order-item.type';
import { UserType } from './user.type';

@ObjectType()
export class OrderType {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Float)
  total: number;

  @Field()
  created_at: Date;

  @Field(() => UserType)
  user: UserType;

  @Field(() => [OrderItemType])
  items: OrderItemType[];
}
