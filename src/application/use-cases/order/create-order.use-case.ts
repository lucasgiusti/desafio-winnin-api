import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/application/interfaces/repositories/order.repository.interface';
import { IOrderItemRepository } from 'src/application/interfaces/repositories/order-item.repository.interface';
import { IProductRepository } from 'src/application/interfaces/repositories/product.repository.interface';
import { IUserRepository } from 'src/application/interfaces/repositories/user.repository.interface';
import { Order } from 'src/domain/entities/order';
import { OrderItem } from 'src/domain/entities/order-item';
import { CreateOrderDto } from 'src/infraestructure/http/dtos/order/create-order.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateOrderUseCase {

    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly orderItemRepository: IOrderItemRepository,
        private readonly productRepository: IProductRepository,
        private readonly userRepository: IUserRepository,
        private readonly dataSource: DataSource,
    ) {}

    async execute(createOrderDto: CreateOrderDto): Promise<Order> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = await this.userRepository.findById(createOrderDto.user_id);
            if (!user) {
                throw new NotFoundException(`Usuário com id ${createOrderDto.user_id} não encontrado`);
            }

            let total = 0;
            const productItems: { product_id: number, price: number, quantity: number }[] = [];
            const productsToUpdate = [];

            for (const item of createOrderDto.items) {
                const product = await queryRunner.manager
                    .createQueryBuilder()
                    .select("product")
                    .from("products", "product")
                    .where("product.id = :id", { id: item.product_id })
                    .setLock("pessimistic_write") // Lock para escrita
                    .getOne();

                if (!product) {
                    throw new NotFoundException(`Produto com id ${item.product_id} não encontrado`);
                }

                if (product.stock < item.quantity) {
                    throw new Error(`Produto ${product.name} não possui estoque suficiente`);
                }

                const itemTotal = product.price * item.quantity;
                total += itemTotal;

                productItems.push({
                    product_id: product.id,
                    price: product.price,
                    quantity: item.quantity
                });

                productsToUpdate.push({
                    id: product.id,
                    stock: product.stock - item.quantity
                });
            }

            const order = new Order({
                user_id: createOrderDto.user_id,
                total
            });

            const savedOrder = await queryRunner.manager.save('orders', order);

            await Promise.all(productItems.map(item => {
                const orderItem = new OrderItem({
                    order_id: savedOrder.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                });

                return queryRunner.manager.save('order_items', orderItem);
            }));

            await Promise.all(productsToUpdate.map(product => {
                return queryRunner.manager
                    .createQueryBuilder()
                    .update('products')
                    .set({ stock: product.stock })
                    .where("id = :id", { id: product.id })
                    .execute();
            }));

            await queryRunner.commitTransaction();
            
            return savedOrder;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
