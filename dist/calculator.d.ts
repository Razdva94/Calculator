import { ExpressionParser } from './parser';
import { IOperation } from './interfaces/operation.interface';
export declare class Calculator {
    private parser;
    private operations;
    constructor(parser: ExpressionParser, operations: Map<string, {
        operation: {
            priority: number;
            action: IOperation;
        };
    }>);
    calculate(expression: string): number | void;
    private processBrackets;
    private findResult;
    private findPriority;
    private findMaxPriority;
    private handleUnaryMinus;
    private searchCycle;
    private calculateOperation;
}
