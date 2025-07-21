import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/product/find-all-products.use-case';
import { ProductType } from '../dto/product.type';
import { CreateProductInput } from '../dto/create-product.input';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
  ) {}

  @Query(() => [ProductType])
  async products() {
    return this.findAllProductsUseCase.execute({});
  }

  @Query(() => ProductType, { nullable: true })
  async product(@Args('id') id: number) {
    const products = await this.findAllProductsUseCase.execute({});
    return products.find(product => product.id === id);
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.createProductUseCase.execute(input);
  }
}
