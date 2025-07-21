import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/infraestructure/http/dtos/product/create-product.dto';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.use-case';
import { Product } from 'src/domain/entities/product';
import { FindAllProductsUseCase } from 'src/application/use-cases/product/find-all-products.use-case';

@ApiTags('v1/products')
@Controller('v1/products')
export class ProductController {

    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly findAllProductsUseCase: FindAllProductsUseCase,
    ) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        console.log('------createProductDto');
        console.log(createProductDto);
        console.log('------createProductDto');
        const response = await this.createProductUseCase.execute(createProductDto);
        return response;
    }
    
    @Get()
    async findAll(): Promise<Product[]> {
        const response = await this.findAllProductsUseCase.execute({});
        return response;
    }
}