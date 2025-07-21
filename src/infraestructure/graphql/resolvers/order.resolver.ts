import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateOrderUseCase } from 'src/application/use-cases/order/create-order.use-case';
import { OrderType } from '../dto/order.type';
import { CreateOrderInput } from '../dto/create-order.input';

@Resolver(() => OrderType)
export class OrderResolver {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  @Query(() => [OrderType])
  async orders() {
    return [];
  }

  @Query(() => OrderType, { nullable: true })
  async order(@Args('id') id: number) {
    return null;
  }

  @Mutation(() => OrderType)
  async createOrder(@Args('input') input: CreateOrderInput) {
    return this.createOrderUseCase.execute(input);
  }
}
