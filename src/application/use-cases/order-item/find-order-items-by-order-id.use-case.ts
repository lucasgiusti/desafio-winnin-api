import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderItemRepository } from 'src/application/interfaces/repositories/order-item.repository.interface';
import { OrderItem } from 'src/domain/entities/order-item';

interface FindOrderItemsByOrderIdUseCaseCommand {
    orderId: number;
}

@Injectable()
export class FindOrderItemsByOrderIdUseCase {

    constructor(
        private readonly orderItemRepository: IOrderItemRepository,
    ) {}

    async execute({ orderId }: FindOrderItemsByOrderIdUseCaseCommand): Promise<OrderItem[]> {
        const orderItems = await this.orderItemRepository.findByOrderId(orderId);
        return orderItems;
    }
}