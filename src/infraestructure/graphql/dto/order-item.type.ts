import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType()
export class OrderItemType {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  order_id: number;

  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => ProductType)
  product: ProductType;
}
