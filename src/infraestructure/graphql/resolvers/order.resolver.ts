import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CreateOrderUseCase } from 'src/application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from 'src/application/use-cases/order/find-order-by-id.use-case';
import { OrderType } from '../dto/order.type';
import { OrderItemType } from '../dto/order-item.type';
import { UserType } from '../dto/user.type';
import { CreateOrderInput } from '../dto/create-order.input';
import { FindOrderItemsByOrderIdUseCase } from 'src/application/use-cases/order-item/find-order-items-by-order-id.use-case';
import { FindUserByIdUseCase } from 'src/application/use-cases/user/find-user-by-id.use-case';

@Resolver(() => OrderType)
export class OrderResolver {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    private readonly findOrderItemsByOrderIdUseCase: FindOrderItemsByOrderIdUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Query(() => [OrderType])
  async orders() {
    const orders = await this.findAllOrdersUseCase.execute({});
    return orders;
  }

  @Query(() => OrderType, { nullable: true })
  async order(@Args('id') id: number) {
    const order = await this.findOrderByIdUseCase.execute({ id });
    return order;
  }

  @Mutation(() => OrderType)
  async createOrder(@Args('input') input: CreateOrderInput) {
    const order = await this.createOrderUseCase.execute(input);
    return order;
  }

  @ResolveField(() => [OrderItemType])
  async items(@Parent() order: OrderType) {
    const orderItems = await this.findOrderItemsByOrderIdUseCase.execute({ orderId: order.id });
    return orderItems;
  }

  @ResolveField(() => UserType)
  async user(@Parent() order: OrderType) {
    const user = await this.findUserByIdUseCase.execute({ id: order.user_id });
    return user;
  }
}
