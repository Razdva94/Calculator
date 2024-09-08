import { IOperation } from '../interfaces/operation.interface';

class Addition implements IOperation {
  execute(a: number, b: number): number {
    return a + b;
  }
}

export default new Addition();
