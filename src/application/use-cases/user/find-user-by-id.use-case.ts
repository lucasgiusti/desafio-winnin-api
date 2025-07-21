import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/application/interfaces/repositories/user.repository.interface';
import { User } from 'src/domain/entities/user';

interface FindUserByIdUseCaseCommand {
    id: number;
}

@Injectable()
export class FindUserByIdUseCase {

    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async execute({ id }: FindUserByIdUseCaseCommand): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException(`O usuário com id ${id} não foi encontrado`);
        }

        return user;
    }
}