import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ITransactionService } from 'src/application/interfaces/transaction/transaction.service.interface';
import { ITransactionManager } from 'src/application/interfaces/transaction/transaction-manager.interface';
import { TypeOrmTransactionManager } from './typeorm-transaction-manager';

@Injectable()
export class TypeOrmTransactionService implements ITransactionService {
  constructor(private readonly dataSource: DataSource) {}

  async startTransaction(): Promise<ITransactionManager> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return new TypeOrmTransactionManager(queryRunner);
  }

  async commitTransaction(transactionManager: ITransactionManager): Promise<void> {
    const queryRunner = transactionManager.getManager();
    await queryRunner.commitTransaction();
  }

  async rollbackTransaction(transactionManager: ITransactionManager): Promise<void> {
    const queryRunner = transactionManager.getManager();
    await queryRunner.rollbackTransaction();
  }

  async releaseTransaction(transactionManager: ITransactionManager): Promise<void> {
    const queryRunner = transactionManager.getManager();
    await queryRunner.release();
  }
}
