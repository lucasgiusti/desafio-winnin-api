import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/application/interfaces/repositories/product.repository.interface';
import { Product } from 'src/domain/entities/product';

interface FindAllProductsUseCaseCommand {}

@Injectable()
export class FindAllProductsUseCase {

    constructor(
        private readonly productRepository: IProductRepository,
    ) {}

    async execute({}: FindAllProductsUseCaseCommand): Promise<Product[]> {
        const products = await this.productRepository.findAll();
        return products;
    }
}