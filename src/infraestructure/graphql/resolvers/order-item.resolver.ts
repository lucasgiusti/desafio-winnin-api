import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { OrderItemType } from '../dto/order-item.type';
import { ProductType } from '../dto/product.type';
import { FindProductByIdUseCase } from 'src/application/use-cases/product/find-product-by-id.use-case';

@Resolver(() => OrderItemType)
export class OrderItemResolver {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @ResolveField(() => ProductType)
  async product(@Parent() orderItem: OrderItemType) {
    const product = await this.findProductByIdUseCase.execute({ id: orderItem.product_id });
    return product;
  }
}
