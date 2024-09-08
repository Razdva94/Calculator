import { IOperation } from '../interfaces/operation.interface';

class Division implements IOperation {
  execute(a: number, b: number): number {
    return a / b;
  }
}

export default new Division();
