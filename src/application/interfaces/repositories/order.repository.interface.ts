import { Order } from "src/domain/entities/order";

export abstract class IOrderRepository {
    abstract create(order: Order): Promise<Order>
    abstract findById(id: number): Promise<Order | null>
    abstract findByUserId(userId: number): Promise<Order[]>
    abstract findAll(): Promise<Order[]>
}
