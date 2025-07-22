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
import { FindUserByIdUseCase } from "src/application/use-cases/user/find-user-by-id.use-case";
import { FindProductByIdUseCase } from "src/application/use-cases/product/find-product-by-id.use-case";
import { FindAllOrdersUseCase } from "src/application/use-cases/order/find-all-orders.use-case";
import { FindOrderByIdUseCase } from "src/application/use-cases/order/find-order-by-id.use-case";
import { FindOrdersByUserIdUseCase } from "src/application/use-cases/order/find-orders-by-user-id.use-case";
import { FindOrderItemsByOrderIdUseCase } from "src/application/use-cases/order-item/find-order-items-by-order-id.use-case";

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
        FindUserByIdUseCase,
        FindProductByIdUseCase,
        FindAllOrdersUseCase,
        FindOrderByIdUseCase,
        FindOrdersByUserIdUseCase,
        FindOrderItemsByOrderIdUseCase,
    ],
    controllers: [
        UserController,
        ProductController,
        OrderController
    ],
})
export class HttpModule {}