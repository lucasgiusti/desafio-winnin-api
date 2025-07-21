import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem as OrderItemTypeOrm } from '../entities/order-item.entity';
import { OrderItem } from "src/domain/entities/order-item";
import { IOrderItemRepository } from 'src/application/interfaces/repositories/order-item.repository.interface';
import { TypeOrmOrderItemMapper } from '../mapper/typeorm-order-item.mapper';

@Injectable()
export class TypeOrmOrderItemRepository implements IOrderItemRepository {
  
  constructor(
    @InjectRepository(OrderItemTypeOrm)
    private orderItemRepository: Repository<OrderItemTypeOrm>,
  ) {}

  async create(orderItem: OrderItem): Promise<OrderItem> {
    const data = TypeOrmOrderItemMapper.toTypeOrm(orderItem);
    const newOrderItem = this.orderItemRepository.create(data);

    const savedOrderItem = await this.orderItemRepository.save(newOrderItem);
    
    return TypeOrmOrderItemMapper.toDomain(savedOrderItem);
  }

  async findById(id: number): Promise<OrderItem | null> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id }
    });
    
    if (!orderItem) {
      return null;
    }
    
    return TypeOrmOrderItemMapper.toDomain(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    const orderItems = await this.orderItemRepository.find();
    return orderItems.map(orderItem => TypeOrmOrderItemMapper.toDomain(orderItem));
  }

  async findByOrderId(orderId: number): Promise<OrderItem[]> {
    const orderItems = await this.orderItemRepository.find({
      where: { order_id: orderId }
    });
    return orderItems.map(orderItem => TypeOrmOrderItemMapper.toDomain(orderItem));
  }
}
