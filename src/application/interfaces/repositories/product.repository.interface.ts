import { Product } from "src/domain/entities/product";

export abstract class IProductRepository {
    abstract create(product: Product): Promise<Product>
    abstract findById(id: number): Promise<Product | null>
    abstract findAll(): Promise<Product[]>
}