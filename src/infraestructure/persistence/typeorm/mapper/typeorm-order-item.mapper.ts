import { OrderItem } from 'src/domain/entities/order-item';
import { OrderItem as OrderItemTypeOrm } from '../entities/order-item.entity';

export class TypeOrmOrderItemMapper {
    
    static toDomain(entity: OrderItemTypeOrm): OrderItem {
        if (!entity) return null;
        
        const model = new OrderItem({
            id: entity.id,
            order_id: entity.order_id,
            product_id: entity.product_id,
            quantity: entity.quantity,
            price: entity.price,
        });
        return model;
    }

    static toTypeOrm(orderItem: OrderItem) {
        return {
            order_id: orderItem.order_id,
            product_id: orderItem.product_id,
            quantity: orderItem.quantity,
            price: orderItem.price,
        }
    }
}
