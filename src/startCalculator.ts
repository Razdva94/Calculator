import * as readline from 'readline';
import { Calculator } from './calculator';
import { ExpressionParser } from './parser';
import addition from './operators/addition';
import substraction from './operators/substraction';
import multiplication from './operators/multiplication';
import division from './operators/division';
import exponentiation from './operators/exponentiation';
import { IOperation } from './interfaces/operation.interface';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askForStart() {
  rl.question(
    'Введите "start" для начала или "exit" для выхода: ',
    (command: string) => {
      if (command.toLowerCase() === 'start') {
        startCalculator();
      } else if (command.toLowerCase() === 'exit') {
        console.log('Программа завершена.');
        rl.close();
      } else {
        console.log('Неверная команда. Попробуйте снова.');
        askForStart();
      }
    },
  );
}

export function startCalculator() {
  rl.question(
    'Введите выражение (или "exit" для выхода): ',
    (expression: string) => {
      if (expression.toLowerCase() === 'exit') {
        console.log('Программа завершена.');
        askForStart();
        return;
      }

      const parser = new ExpressionParser();

      const operations = new Map<
        string,
        { operation: { priority: number; action: IOperation } }
      >();
      operations.set('+', { operation: { action: addition, priority: 1 } });
      operations.set('-', { operation: { action: substraction, priority: 1 } });
      operations.set('*', {
        operation: { action: multiplication, priority: 2 },
      });
      operations.set('/', { operation: { action: division, priority: 2 } });
      operations.set('^', {
        operation: { action: exponentiation, priority: 3 },
      });

      const calculator = new Calculator(parser, operations);
      try {
        calculator.calculate(expression);
        startCalculator();
      } catch (error) {
        if (error instanceof Error) {
          console.log(`${error.message}`);
          startCalculator();
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    },
  );
}

askForStart();
