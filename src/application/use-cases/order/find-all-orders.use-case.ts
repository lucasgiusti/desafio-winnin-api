import { Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/application/interfaces/repositories/order.repository.interface';
import { Order } from 'src/domain/entities/order';

interface FindAllOrdersUseCaseCommand {}

@Injectable()
export class FindAllOrdersUseCase {

    constructor(
        private readonly orderRepository: IOrderRepository,
    ) {}

    async execute({}: FindAllOrdersUseCaseCommand): Promise<Order[]> {
        const orders = await this.orderRepository.findAll();
        return orders;
    }
}