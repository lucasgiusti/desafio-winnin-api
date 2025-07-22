import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/application/interfaces/repositories/product.repository.interface';
import { Product } from 'src/domain/entities/product';

interface CreateProductUseCaseCommand {
    name: string,
    price: number,
    stock: number,
}

@Injectable()
export class CreateProductUseCase {

    constructor(
        private readonly productRepository: IProductRepository,
    ) {}

    async execute({
        name,
        price,
        stock,
    }: CreateProductUseCaseCommand): Promise<Product> {
        const product = new Product({
            name,
            price,
            stock,
        })

        const response = await this.productRepository.create(product);
        return response;
    }
}