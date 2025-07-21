import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/infraestructure/http/dtos/user/create-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { User } from 'src/domain/entities/user';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/find-all-users.use-case';

@ApiTags('v1/users')
@Controller('v1/users')
export class UserController {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const response = await this.createUserUseCase.execute(createUserDto);
        return response;
    }
    
    @Get()
    async findAll(): Promise<User[]> {
        const response = await this.findAllUsersUseCase.execute({});
        return response;
    }
}