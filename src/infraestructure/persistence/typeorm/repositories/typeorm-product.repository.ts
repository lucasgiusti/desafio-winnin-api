import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Product as ProductTypeOrm } from '../entities/product.entity';
import { Product } from "src/domain/entities/product";
import { IProductRepository } from 'src/application/interfaces/repositories/product.repository.interface';
import { TypeOrmProductMapper } from '../mapper/typeorm-product.mapper';
import { ITransactionManager } from 'src/application/interfaces/transaction/transaction-manager.interface';

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  
  constructor(
    @InjectRepository(ProductTypeOrm)
    private productRepository: Repository<ProductTypeOrm>,
  ) {}

  async create(product: Product): Promise<Product> {
    const data = TypeOrmProductMapper.toTypeOrm(product);
    const newProduct = this.productRepository.create(data);

    const savedProduct = await this.productRepository.save(newProduct);
    
    return TypeOrmProductMapper.toDomain(savedProduct);
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    
    if (!product) {
      return null;
    }
    
    return TypeOrmProductMapper.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products.map(product => TypeOrmProductMapper.toDomain(product));
  }

  async findWithLock(id: number, transactionManager?: ITransactionManager): Promise<Product | null> {
    if (transactionManager) {
      const queryRunner = transactionManager.getManager() as QueryRunner;
      const product = await queryRunner.manager
        .createQueryBuilder()
        .select("product")
        .from(ProductTypeOrm, "product")
        .where("product.id = :id", { id })
        .setLock("pessimistic_write")
        .getOne();
      
      if (!product) {
        return null;
      }
      
      return TypeOrmProductMapper.toDomain(product);
    } else {
      const product = await this.productRepository.findOne({ 
        where: { id },
        lock: { mode: 'pessimistic_write' }
      });
      
      if (!product) {
        return null;
      }
      
      return TypeOrmProductMapper.toDomain(product);
    }
  }

  async updateStock(id: number, newStock: number, transactionManager?: ITransactionManager): Promise<void> {
    if (transactionManager) {
      const queryRunner = transactionManager.getManager() as QueryRunner;
      await queryRunner.manager
        .createQueryBuilder()
        .update(ProductTypeOrm)
        .set({ stock: newStock })
        .where("id = :id", { id })
        .execute();
    } else {
      await this.productRepository.update(id, { stock: newStock });
    }
  }
}
