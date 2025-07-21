import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/user/find-all-users.use-case';
import { FindUserByIdUseCase } from 'src/application/use-cases/user/find-user-by-id.use-case';
import { UserType } from '../dto/user.type';
import { OrderType } from '../dto/order.type';
import { CreateUserInput } from '../dto/create-user.input';
import { FindOrdersByUserIdUseCase } from 'src/application/use-cases/order/find-orders-by-user-id.use-case';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findOrdersByUserIdUseCase: FindOrdersByUserIdUseCase,
  ) {}

  @Query(() => [UserType])
  async users() {
    return this.findAllUsersUseCase.execute({});
  }

  @Query(() => UserType, { nullable: true })
  async user(@Args('id') id: number) {
    return this.findUserByIdUseCase.execute({ id });
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.createUserUseCase.execute(input);
  }

  @ResolveField(() => [OrderType])
  async orders(@Parent() user: UserType) {
    const orders = await this.findOrdersByUserIdUseCase.execute({ userId: user.id });
    return orders;
  }
}
