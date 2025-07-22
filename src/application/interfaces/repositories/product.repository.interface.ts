import { Product } from "src/domain/entities/product";
import { ITransactionManager } from "../transaction/transaction-manager.interface";

export abstract class IProductRepository {
    abstract create(product: Product): Promise<Product>
    abstract findById(id: number): Promise<Product | null>
    abstract findAll(): Promise<Product[]>
    abstract findWithLock(id: number, transactionManager?: ITransactionManager): Promise<Product | null>
    abstract updateStock(id: number, newStock: number, transactionManager?: ITransactionManager): Promise<void>
}