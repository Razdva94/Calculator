import { ExpressionParser } from './parser';
import { IOperation } from './interfaces/operation.interface';

export class Calculator {
  private parser: ExpressionParser;
  private operations: Map<string, IOperation>;

  constructor(parser: ExpressionParser, operations: Map<string, IOperation>) {
    this.parser = parser;
    this.operations = operations;
  }

  calculate(expression: string): number | void {
    try {
      const tokens = this.parser.parse(expression);
      const result = this.processBrackets(tokens);
      console.log('result: ', result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  private processBrackets(tokens: string[]): number {
    while (tokens.includes('(')) {
      const closeIndex = tokens.indexOf(')');
      let openIndex = closeIndex;
      while (openIndex >= 0 && tokens[openIndex] !== '(') {
        openIndex--;
      }

      if (openIndex < 0) {
        throw new Error('Ошибка парсинга выражения: несбалансированные скобки');
      }
      const innerTokens = tokens.slice(openIndex + 1, closeIndex);
      const result = this.findResult(innerTokens);
      tokens.splice(openIndex, closeIndex - openIndex + 1, result.toString());
    }
    return this.findResult(tokens);
  }

  private findResult(tokens: string[]) {
    console.log(tokens);
    this.handleUnaryMinus(tokens);
    console.log(tokens);
    const tokensWithPriority = this.searchCycle(tokens, 2);
    const finalTokens = this.searchCycle(tokensWithPriority, 1);
    if (finalTokens.includes('(') || finalTokens.includes(')')) {
      throw new Error('Ошибка парсинга выражения: несбалансированные скобки');
    }
    if (finalTokens.length !== 1) {
      throw new Error('Ошибка: введены некорректные данные');
    }
    const result = Number(finalTokens[0]);
    return result;
  }

  private handleUnaryMinus(tokens: string[]) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '-' && (i === 0 || tokens[i - 1] === '(')) {
        const number = Number(tokens[i + 1]);
        console.log(number);
        if (!isNaN(number)) {
          tokens.splice(i, 2, (-number).toString());
        } else {
          throw new Error('Ошибка: введены некорректные данные');
        }
      }
    }
  }

  private searchCycle(tokens: string[], priority: number) {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.findOrderOfOperations(token) === priority) {
        const firstOperand = Number(tokens[i - 1]);
        const secondOperand = Number(tokens[i + 1]);
        const operator = tokens[i];
        if (isNaN(firstOperand) || isNaN(secondOperand)) {
          throw new Error('Ошибка: введены некорректные данные');
        }
        const result = this.calculateOperation(
          firstOperand,
          secondOperand,
          operator,
        );
        tokens.splice(i - 1, 3, result.toString());
        i = 0;
      }
    }
    return tokens;
  }

  private calculateOperation(
    firstOperand: number,
    secondOperand: number,
    operator: string,
  ) {
    const operation = this.operations.get(operator);
    if (!operation) {
      throw new Error(`Ошибка: неизвестная операция '${operator}'`);
    }
    return operation.execute(firstOperand, secondOperand);
  }

  private findOrderOfOperations(operator: string) {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }
}
