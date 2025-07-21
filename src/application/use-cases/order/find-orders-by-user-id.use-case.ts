import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/application/interfaces/repositories/order.repository.interface';
import { Order } from 'src/domain/entities/order';

interface FindOrdersByUserIdUseCaseCommand {
    userId: number;
}

@Injectable()
export class FindOrdersByUserIdUseCase {

    constructor(
        private readonly orderRepository: IOrderRepository,
    ) {}

    async execute({ userId }: FindOrdersByUserIdUseCaseCommand): Promise<Order[]> {
        const orders = await this.orderRepository.findByUserId(userId);
        return orders;
    }
}