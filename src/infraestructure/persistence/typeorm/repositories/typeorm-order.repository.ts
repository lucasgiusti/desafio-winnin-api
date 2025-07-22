import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order as OrderTypeOrm } from '../entities/order.entity';
import { Order } from "src/domain/entities/order";
import { IOrderRepository } from 'src/application/interfaces/repositories/order.repository.interface';
import { TypeOrmOrderMapper } from '../mapper/typeorm-order.mapper';
import { ITransactionManager } from 'src/application/interfaces/transaction/transaction-manager.interface';

@Injectable()
export class TypeOrmOrderRepository implements IOrderRepository {
  
  constructor(
    @InjectRepository(OrderTypeOrm)
    private orderRepository: Repository<OrderTypeOrm>,
  ) {}

  async create(order: Order): Promise<Order> {
    const data = TypeOrmOrderMapper.toTypeOrm(order);
    const newOrder = this.orderRepository.create(data);

    const savedOrder = await this.orderRepository.save(newOrder);
    
    return TypeOrmOrderMapper.toDomain(savedOrder);
  }

  async createWithTransaction(order: Order, transactionManager: ITransactionManager): Promise<Order> {
    const data = TypeOrmOrderMapper.toTypeOrm(order);
    const newOrder = this.orderRepository.create(data);

    const queryRunner = transactionManager.getManager();
    const savedOrder = await queryRunner.manager.save('orders', newOrder);
    
    return TypeOrmOrderMapper.toDomain(savedOrder);
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id }
    });
    
    if (!order) {
      return null;
    }
    
    return TypeOrmOrderMapper.toDomain(order);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders.map(order => TypeOrmOrderMapper.toDomain(order));
  }

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { user_id: userId }
    });
    return orders.map(order => TypeOrmOrderMapper.toDomain(order));
  }
}
