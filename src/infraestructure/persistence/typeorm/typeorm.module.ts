import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule as TypeOrmModuleLib } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { IUserRepository } from "src/application/interfaces/repositories/user.repository.interface";
import { TypeOrmUserRepository } from "./repositories/typeorm-user.repository";
import { Product } from "./entities/product.entity";
import { IProductRepository } from "src/application/interfaces/repositories/product.repository.interface";
import { TypeOrmProductRepository } from "./repositories/typeorm-product.repository";
import { Order } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";
import { IOrderRepository } from "src/application/interfaces/repositories/order.repository.interface";
import { IOrderItemRepository } from "src/application/interfaces/repositories/order-item.repository.interface";
import { TypeOrmOrderRepository } from "./repositories/typeorm-order.repository";
import { TypeOrmOrderItemRepository } from "./repositories/typeorm-order-item.repository";
import { ITransactionService } from "src/application/interfaces/transaction/transaction.service.interface";
import { DataSource } from "typeorm";
import { TypeOrmTransactionService } from "./transaction/typeorm-transaction.service";

@Module({
  imports: [
    TypeOrmModuleLib.forRootAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get<string>('POSTGRES_USER', 'postgres'),
        password: configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
        database: configService.get<string>('POSTGRES_DB', 'winnin_api'),
        entities: [User, Product, Order, OrderItem],
        synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE', false),
        logging: configService.get<boolean>('TYPEORM_LOGGING', false),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModuleLib.forFeature([User, Product, Order, OrderItem]),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: IProductRepository,
      useClass: TypeOrmProductRepository,
    },
    {
      provide: IOrderRepository,
      useClass: TypeOrmOrderRepository,
    },
    {
      provide: IOrderItemRepository,
      useClass: TypeOrmOrderItemRepository,
    },
    {
      provide: ITransactionService,
      useClass: TypeOrmTransactionService,
    }
  ],
  exports: [
    IUserRepository,
    IProductRepository,
    IOrderRepository,
    IOrderItemRepository,
    ITransactionService,
  ],
})
export class TypeOrmModule {}
