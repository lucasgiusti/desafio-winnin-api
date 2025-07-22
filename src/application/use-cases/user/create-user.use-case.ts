import { Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from 'src/application/interfaces/repositories/user.repository.interface';
import { User } from 'src/domain/entities/user';

interface CreateUserUseCaseCommand {
    name: string,
    email: string,
}

@Injectable()
export class CreateUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async execute({
        name,
        email,
    }: CreateUserUseCaseCommand): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        
        if (existingUser) {
            throw new ConflictException('Já existe um usuário com este e-mail');
        }
        
        const user = new User({
            name,
            email,
        });

        const response = await this.userRepository.create(user);
        return response;
    }
}