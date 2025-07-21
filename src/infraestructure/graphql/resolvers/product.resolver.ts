import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/product/find-all-products.use-case';
import { FindProductByIdUseCase } from 'src/application/use-cases/product/find-product-by-id.use-case';
import { ProductType } from '../dto/product.type';
import { CreateProductInput } from '../dto/create-product.input';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @Query(() => [ProductType])
  async products() {
    return this.findAllProductsUseCase.execute({});
  }

  @Query(() => ProductType, { nullable: true })
  async product(@Args('id') id: number) {
    return this.findProductByIdUseCase.execute({ id });
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.createProductUseCase.execute(input);
  }
}
