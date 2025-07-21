import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { UserResolver } from './resolvers/user.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { OrderResolver } from './resolvers/order.resolver';

// Importar casos de uso
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/find-all-users.use-case';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/product/find-all-products.use-case';
import { CreateOrderUseCase } from 'src/application/use-cases/order/create-order.use-case';

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
    CreateUserUseCase,
    FindAllUsersUseCase,
    CreateProductUseCase,
    FindAllProductsUseCase,
    CreateOrderUseCase,
  ],
})
export class GraphQLAppModule {}
