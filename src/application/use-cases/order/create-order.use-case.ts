import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/application/interfaces/repositories/user.repository.interface';
import { IProductRepository } from 'src/application/interfaces/repositories/product.repository.interface';
import { IOrderRepository } from 'src/application/interfaces/repositories/order.repository.interface';
import { IOrderItemRepository } from 'src/application/interfaces/repositories/order-item.repository.interface';
import { ITransactionService } from 'src/application/interfaces/transaction/transaction.service.interface';
import { Order } from 'src/domain/entities/order';
import { OrderItem } from 'src/domain/entities/order-item';
import { Product } from 'src/domain/entities/product';

interface CreateOrderItemCommand {
    product_id: number;
    quantity: number;
}

interface CreateOrderCommand {
    user_id: number;
    items: CreateOrderItemCommand[];
}

@Injectable()
export class CreateOrderUseCase {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly productRepository: IProductRepository,
        private readonly orderRepository: IOrderRepository,
        private readonly orderItemRepository: IOrderItemRepository,
        private readonly transactionService: ITransactionService,
    ) {}

    async execute({
        user_id,
        items
    }: CreateOrderCommand): Promise<Order> {
        const transactionManager = await this.transactionService.startTransaction();

        try {
            const user = await this.userRepository.findById(user_id);
            if (!user) {
                throw new NotFoundException(`Usuário com id ${user_id} não encontrado`);
            }

            const order = new Order({
                user_id: user_id,
                total: 0
            });

            for (const item of items) {
                const product = await this.productRepository.findWithLock(item.product_id, transactionManager);

                this.validateItemProduct(item, product);

                const orderItem = new OrderItem({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: product.price,
                    order_id: null,
                });

                order.addItem(orderItem);

                await this.productRepository.updateStock(product.id, product.stock - item.quantity, transactionManager);
            }

            const savedOrder = await this.orderRepository.createWithTransaction(order, transactionManager);

            for (const item of order.items) {
                item.order_id = savedOrder.id;
                await this.orderItemRepository.createWithTransaction(item, transactionManager);
            }

            await this.transactionService.commitTransaction(transactionManager);
            
            return savedOrder;
        } catch (error) {
            await this.transactionService.rollbackTransaction(transactionManager);
            throw error;
        } finally {
            await this.transactionService.releaseTransaction(transactionManager);
        }
    }

    validateItemProduct(item: CreateOrderItemCommand, product: Product) {
        if (!product) {
            throw new NotFoundException(`Produto com id ${item.product_id} não encontrado`);
        }

        if (product.stock < item.quantity) {
            throw new Error(`Produto ${product.name} não possui estoque suficiente`);
        }
    }


}
