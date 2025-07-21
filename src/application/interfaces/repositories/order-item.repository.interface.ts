import { OrderItem } from "src/domain/entities/order-item";

export abstract class IOrderItemRepository {
    abstract create(orderItem: OrderItem): Promise<OrderItem>
    abstract findById(id: number): Promise<OrderItem | null>
    abstract findAll(): Promise<OrderItem[]>
}
