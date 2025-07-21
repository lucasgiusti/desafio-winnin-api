import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/infraestructure/http/dtos/user/create-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { User } from 'src/domain/entities/user';

@ApiTags('v1/users')
@Controller('v1/users')
export class UserController {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const response = await this.createUserUseCase.execute(createUserDto);
        return response;
    }
}