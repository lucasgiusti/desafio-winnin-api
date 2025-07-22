import { Order } from "src/domain/entities/order";
import { ITransactionManager } from "../transaction/transaction-manager.interface";

export abstract class IOrderRepository {
    abstract create(order: Order): Promise<Order>
    abstract createWithTransaction(order: Order, transactionManager: ITransactionManager): Promise<Order>
    abstract findById(id: number): Promise<Order | null>
    abstract findByUserId(userId: number): Promise<Order[]>
    abstract findAll(): Promise<Order[]>
}
