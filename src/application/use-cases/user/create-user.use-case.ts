import { Injectable } from '@nestjs/common';
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
        const user = new User({
            name,
            email,
        })

        const response = await this.userRepository.create(user);
        return response;
    }
}