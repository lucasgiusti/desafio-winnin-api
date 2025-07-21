import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule as TypeOrmModuleLib } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { IUserRepository } from "src/application/interfaces/repositories/user.repository.interface";
import { TypeOrmUserRepository } from "./repositories/typeorm-user.repository";

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
        entities: [User],
        synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE', false), // Cuidado! Use apenas em desenvolvimento
        logging: configService.get<boolean>('TYPEORM_LOGGING', false),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModuleLib.forFeature([User]),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: TypeOrmUserRepository,
    }
  ],
  exports: [
    IUserRepository,
  ],
})
export class TypeOrmModule {}
