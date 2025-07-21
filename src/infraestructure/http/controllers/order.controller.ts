import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/infraestructure/http/dtos/order/create-order.dto';
import { CreateOrderUseCase } from 'src/application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from 'src/application/use-cases/order/find-order-by-id.use-case';

@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
        private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
    ) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        const order = await this.createOrderUseCase.execute(createOrderDto);
        return order;
    }

    @Get()
    async findAll() {
        const orders = await this.findAllOrdersUseCase.execute({});
        return orders;
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        const order = await this.findOrderByIdUseCase.execute({ id });
        return order;
    }
}
