import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/infraestructure/http/dtos/user/create-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { User } from 'src/domain/entities/user';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/find-all-users.use-case';
import { FindUserByIdUseCase } from 'src/application/use-cases/user/find-user-by-id.use-case';

@ApiTags('v1/users')
@Controller('v1/users')
export class UserController {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
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

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        const response = await this.findUserByIdUseCase.execute({ id });
        return response;
    }
}