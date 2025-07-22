import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { PersistenceModule } from './infraestructure/persistence/persistence.module';
import { HttpModule } from './infraestructure/http/http.module';
import { GraphQLAppModule } from './infraestructure/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PersistenceModule.register({
      type: 'typeorm',
      global: true,
    }),
    HttpModule,
    GraphQLAppModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
