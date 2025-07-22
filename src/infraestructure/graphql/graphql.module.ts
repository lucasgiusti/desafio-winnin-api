import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserResolver } from './resolvers/user.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderItemResolver } from './resolvers/order-item.resolver';

// Importar casos de uso
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/find-all-users.use-case';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/product/find-all-products.use-case';
import { CreateOrderUseCase } from 'src/application/use-cases/order/create-order.use-case';
import { FindUserByIdUseCase } from 'src/application/use-cases/user/find-user-by-id.use-case';
import { FindProductByIdUseCase } from 'src/application/use-cases/product/find-product-by-id.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from 'src/application/use-cases/order/find-order-by-id.use-case';
import { FindOrdersByUserIdUseCase } from 'src/application/use-cases/order/find-orders-by-user-id.use-case';
import { FindOrderItemsByOrderIdUseCase } from 'src/application/use-cases/order-item/find-order-items-by-order-id.use-case';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  providers: [
    UserResolver,
    ProductResolver,
    OrderResolver,
    OrderItemResolver,
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
    CreateOrderUseCase,
    FindAllOrdersUseCase,
    FindOrderByIdUseCase,
    FindOrdersByUserIdUseCase, 
    FindOrderItemsByOrderIdUseCase,
  ],
})
export class GraphQLAppModule {}
