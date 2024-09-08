import { IOperation } from '../interfaces/operation.interface';

class Substraction implements IOperation {
  execute(a: number, b: number): number {
    return a - b;
  }
}

export default new Substraction();
