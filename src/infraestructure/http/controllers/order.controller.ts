import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/infraestructure/http/dtos/order/create-order.dto';
import { CreateOrderUseCase } from 'src/application/use-cases/order/create-order.use-case';

@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
    ) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        const order = await this.createOrderUseCase.execute(createOrderDto);
        return order;
    }
}
