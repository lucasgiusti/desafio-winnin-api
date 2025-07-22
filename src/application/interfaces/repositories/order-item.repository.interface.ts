import { OrderItem } from "src/domain/entities/order-item";
import { ITransactionManager } from "../transaction/transaction-manager.interface";

export abstract class IOrderItemRepository {
    abstract create(orderItem: OrderItem): Promise<OrderItem>
    abstract createWithTransaction(orderItem: OrderItem, transactionManager: ITransactionManager): Promise<OrderItem>
    abstract findById(id: number): Promise<OrderItem | null>
    abstract findByOrderId(orderId: number): Promise<OrderItem[]>
    abstract findAll(): Promise<OrderItem[]>
}
