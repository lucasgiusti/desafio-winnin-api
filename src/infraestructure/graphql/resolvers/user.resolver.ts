import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/find-all-users.use-case';
import { UserType } from '../dto/user.type';
import { CreateUserInput } from '../dto/create-user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  @Query(() => [UserType])
  async users() {
    return this.findAllUsersUseCase.execute({});
  }

  @Query(() => UserType, { nullable: true })
  async user(@Args('id') id: number) {
    const users = await this.findAllUsersUseCase.execute({});
    return users.find(user => user.id === id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.createUserUseCase.execute(input);
  }
}
