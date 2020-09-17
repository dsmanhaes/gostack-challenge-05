import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type === 'income' || type === 'outcome') {
      if (type === 'outcome') {
        const saldo = this.transactionsRepository.getBalance().total;
        if (saldo - value <= 0) {
          throw new Error('Insuficient funds');
        }
      }
      return this.transactionsRepository.create({ title, value, type });
    }
    throw new Error('Type of transaction not allowed');
  }
}

export default CreateTransactionService;
