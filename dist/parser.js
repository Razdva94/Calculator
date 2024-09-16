"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionParser = void 0;
class ExpressionParser {
    parse(expression) {
        if (!/^[\d+\-^*/() ]+$/.test(expression)) {
            throw new Error('Введены некорректные данные');
        }
        const tokens = expression.match(/\d+|\+|\-|\^|\*|\/|\(|\)/g);
        if (tokens) {
            return tokens;
        }
        else {
            throw new Error('Ошибка парсинга выражения');
        }
    }
}
exports.ExpressionParser = ExpressionParser;
//# sourceMappingURL=parser.js.map