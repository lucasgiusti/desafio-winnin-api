import { ITransactionManager } from "./transaction-manager.interface";

export abstract class ITransactionService {
  abstract startTransaction(): Promise<ITransactionManager>;
  abstract commitTransaction(transactionManager: ITransactionManager): Promise<void>;
  abstract rollbackTransaction(transactionManager: ITransactionManager): Promise<void>;
  abstract releaseTransaction(transactionManager: ITransactionManager): Promise<void>;
}
