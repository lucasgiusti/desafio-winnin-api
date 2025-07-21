import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product as ProductTypeOrm } from '../entities/product.entity';
import { Product } from "src/domain/entities/product";
import { IProductRepository } from 'src/application/interfaces/repositories/product.repository.interface';
import { TypeOrmProductMapper } from '../mapper/typeorm-product.mapper';

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
}
