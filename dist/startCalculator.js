"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCalculator = startCalculator;
const readline = require("readline");
const calculator_1 = require("./calculator");
const parser_1 = require("./parser");
const addition_1 = require("./operators/addition");
const substraction_1 = require("./operators/substraction");
const multiplication_1 = require("./operators/multiplication");
const division_1 = require("./operators/division");
const exponentiation_1 = require("./operators/exponentiation");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askForStart() {
    rl.question('Введите "start" для начала или "exit" для выхода: ', (command) => {
        if (command.toLowerCase() === 'start') {
            startCalculator();
        }
        else if (command.toLowerCase() === 'exit') {
            console.log('Программа завершена.');
            rl.close();
        }
        else {
            console.log('Неверная команда. Попробуйте снова.');
            askForStart();
        }
    });
}
function startCalculator() {
    rl.question('Введите выражение (или "exit" для выхода): ', (expression) => {
        if (expression.toLowerCase() === 'exit') {
            console.log('Программа завершена.');
            askForStart();
            return;
        }
        const parser = new parser_1.ExpressionParser();
        const operations = new Map();
        operations.set('+', { operation: { action: addition_1.default, priority: 1 } });
        operations.set('-', { operation: { action: substraction_1.default, priority: 1 } });
        operations.set('*', {
            operation: { action: multiplication_1.default, priority: 2 },
        });
        operations.set('/', { operation: { action: division_1.default, priority: 2 } });
        operations.set('^', {
            operation: { action: exponentiation_1.default, priority: 3 },
        });
        const calculator = new calculator_1.Calculator(parser, operations);
        try {
            calculator.calculate(expression);
            startCalculator();
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`${error.message}`);
                startCalculator();
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    });
}
askForStart();
//# sourceMappingURL=startCalculator.js.map