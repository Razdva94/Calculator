export class ExpressionParser {
  parse(expression: string): string[] {
    if (!/^[\d+\-*/() ]+$/.test(expression)) {
      throw new Error('Введены некорректные данные');
    }
    const tokens = expression.match(/\d+|\+|\-|\*|\/|\(|\)/g);

    if (tokens) {
      return tokens;
    } else {
      throw new Error('Ошибка парсинга выражения');
    }
  }
}
