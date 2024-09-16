import { IOperation } from '../interfaces/operation.interface';

class Exponentiation implements IOperation {
  execute(a: number, b: number): number {
    return Math.pow(a, b);
  }
}

export default new Exponentiation();
