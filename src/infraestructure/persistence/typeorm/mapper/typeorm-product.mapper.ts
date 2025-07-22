import { Product } from 'src/domain/entities/product';
import { Product as ProductTypeOrm } from '../entities/product.entity';

export class TypeOrmProductMapper {
    
    static toDomain(entity: ProductTypeOrm): Product {
        if (!entity) return null;
        
        const model = new Product({
            id: entity.id,
            name: entity.name,
            price: entity.price,
            stock: entity.stock,
            created_at: entity.created_at,
        });
        return model;
    }

    static toTypeOrm(product: Product) {
        return {
            name: product.name,
            price: product.price,
            stock: product.stock,
        }
    }
}