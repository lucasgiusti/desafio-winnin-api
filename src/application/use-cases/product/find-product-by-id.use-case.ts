import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from 'src/application/interfaces/repositories/product.repository.interface';
import { Product } from 'src/domain/entities/product';

interface FindProductByIdUseCaseCommand {
    id: number;
}

@Injectable()
export class FindProductByIdUseCase {

    constructor(
        private readonly productRepository: IProductRepository,
    ) {}

    async execute({ id }: FindProductByIdUseCaseCommand): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException(`O produto com id ${id} não foi encontrado`);
        }

        return product;
    }
}