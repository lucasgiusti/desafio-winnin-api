import { User } from 'src/domain/entities/user';
import { User as UserTypeOrm } from '../entities/user.entity';

export class TypeOrmUserMapper {
    
    static toDomain(entity: UserTypeOrm): User {
        if (!entity) return null;
        
        const model = new User({
            id: entity.id,
            name: entity.name,
            email: entity.email,
            created_at: entity.created_at,
        });
        return model;
    }

    static toTypeOrm(user: User) {
        return {
            name: user.name,
            email: user.email,
        }
    }
}