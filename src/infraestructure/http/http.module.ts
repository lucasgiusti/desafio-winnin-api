import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controllers/user.controller";
import { CreateUserUseCase } from "src/application/use-cases/user/create-user.use-case";
import { FindAllUsersUseCase } from "src/application/use-cases/user/find-all-users.use-case";
import { CreateProductUseCase } from "src/application/use-cases/product/create-product.use-case";
import { FindAllProductsUseCase } from "src/application/use-cases/product/find-all-products.use-case";
import { ProductController } from "./controllers/product.controller";
import { OrderController } from "./controllers/order.controller";
import { CreateOrderUseCase } from "src/application/use-cases/order/create-order.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
    ],
    providers: [
        CreateUserUseCase,
        FindAllUsersUseCase,
        CreateProductUseCase,
        FindAllProductsUseCase,
        CreateOrderUseCase,
    ],
    controllers: [
        UserController,
        ProductController,
        OrderController
    ],
})
export class HttpModule {}