import { Order } from 'src/domain/entities/order';
import { Order as OrderTypeOrm } from '../entities/order.entity';

export class TypeOrmOrderMapper {
    
    static toDomain(entity: OrderTypeOrm): Order {
        if (!entity) return null;
        
        const model = new Order({
            id: entity.id,
            user_id: entity.user_id,
            total: entity.total,
            created_at: entity.created_at,
        });
        return model;
    }

    static toTypeOrm(order: Order) {
        return {
            user_id: order.user_id,
            total: order.total,
        }
    }
}
