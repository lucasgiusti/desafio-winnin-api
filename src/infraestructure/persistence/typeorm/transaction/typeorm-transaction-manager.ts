import { QueryRunner } from 'typeorm';
import { ITransactionManager } from 'src/application/interfaces/transaction/transaction-manager.interface';

export class TypeOrmTransactionManager implements ITransactionManager {
  constructor(private queryRunner: QueryRunner) {}

  getManager(): QueryRunner {
    return this.queryRunner;
  }
}
