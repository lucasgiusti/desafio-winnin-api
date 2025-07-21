import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { CreateUserUseCase } from "src/application/use-cases/user/create-user.use-case";

@Module({
    imports: [
    ],
    providers: [
        CreateUserUseCase,
    ],
    controllers: [
        UserController,
    ],
})
export class HttpModule {}