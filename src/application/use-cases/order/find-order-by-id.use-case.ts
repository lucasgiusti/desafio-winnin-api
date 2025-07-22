import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/application/interfaces/repositories/order.repository.interface';
import { Order } from 'src/domain/entities/order';

interface FindOrderByIdUseCaseCommand {
    id: number;
}

@Injectable()
export class FindOrderByIdUseCase {

    constructor(
        private readonly orderRepository: IOrderRepository,
    ) {}

    async execute({ id }: FindOrderByIdUseCaseCommand): Promise<Order> {
        const order = await this.orderRepository.findById(id);

        if (!order) {
            throw new NotFoundException(`O pedido com id ${id} não foi encontrado`);
        }

        return order;
    }
}