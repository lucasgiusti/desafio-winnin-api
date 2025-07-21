import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { OrderItemType } from './order-item.type';
import { UserType } from './user.type';

@ObjectType()
export class OrderType {
  @Field(() => ID)
  id: number;

  @Field(() => Float)
  total: number;

  @Field()
  created_at: Date;

  @Field(() => UserType)
  user: UserType;

  @Field(() => [OrderItemType])
  items: OrderItemType[];
}
