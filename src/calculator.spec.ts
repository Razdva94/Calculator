import { Calculator } from './calculator';
import { ExpressionParser } from './parser';
import addition from './operators/addition';
import substraction from './operators/substraction';
import multiplication from './operators/multiplication';
import division from './operators/division';
import { IOperation } from './interfaces/operation.interface';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    const parser = new ExpressionParser();
    const operations = new Map<string, IOperation>();
    operations.set('+', addition);
    operations.set('-', substraction);
    operations.set('*', multiplication);
    operations.set('/', division);

    calculator = new Calculator(parser, operations);
  });

  it('should correctly calculate addition', () => {
    const result = calculator.calculate('2 + 2');
    expect(result).toBe(4);
  });

  it('should correctly calculate subtraction', () => {
    const result = calculator.calculate('5 - 3');
    expect(result).toBe(2);
  });

  it('should correctly calculate multiplication', () => {
    const result = calculator.calculate('4 * 3');
    expect(result).toBe(12);
  });

  it('should correctly calculate division', () => {
    const result = calculator.calculate('10 / 2');
    expect(result).toBe(5);
  });

  it('should correctly calculate expression with brackets', () => {
    const result = calculator.calculate('2 + (3 * 2)');
    expect(result).toBe(8);
  });
  it('should correctly calculate expression with brackets', () => {
    const result = calculator.calculate('- 2 - (3 * 2)');
    expect(result).toBe(-8);
  });

  it('should correctly calculate complex expression with nested brackets', () => {
    const result = calculator.calculate('2 + (3 * (2 + 1)) / 3');
    expect(result).toBe(5);
  });

  it('should throw an error for invalid input', () => {
    expect(() => calculator.calculate('2 + (3 *')).toThrow(
      'Ошибка парсинга выражения: несбалансированные скобки',
    );
  });
  it('should throw an error for invalid input', () => {
    expect(() => calculator.calculate('*')).toThrow(
      'Ошибка: введены некорректные данные',
    );
  });
});
