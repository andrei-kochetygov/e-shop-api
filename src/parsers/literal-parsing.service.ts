import { Injectable } from '@nestjs/common';
import { reduce } from 'lodash';
import { UnableToParseLiteralException } from './exceptions/unable-to-parse-literal.exception';

enum JavaScriptLiteral {
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
  Null = 'null',
  Undefined = 'undefined',
}

@Injectable()
export class LiteralParsingService {
  tryParse(literal?: string) {
    if (!literal) return literal;

    return reduce(
      [this.parseString, this.parseBoolean, this.parseNumber, this.parseNull, this.parseUndefined],
      (result, parse) => {
        try {
          return parse(literal);
        } catch {
          return result;
        }
      },
      literal,
    );
  }

  parseString(literal: string) {
    const trimmedLiteral = literal.trim();

    const doubleQuotedStringRegex = /^"(?<value>.+)"$/;
    const singleQuotedStringRegex = /^'(?<value>.+)'$/;

    const doubleQuotedString = doubleQuotedStringRegex.exec(trimmedLiteral);
    const singleQuotedString = singleQuotedStringRegex.exec(trimmedLiteral);

    const string = doubleQuotedString?.groups?.value ?? singleQuotedString?.groups?.value;

    if (!string) {
      throw new UnableToParseLiteralException(literal, JavaScriptLiteral.String);
    }

    return string;
  }

  parseBoolean(literal: string) {
    if (!['true', 'false'].includes(literal)) {
      throw new UnableToParseLiteralException(literal, JavaScriptLiteral.Boolean);
    }

    return literal === 'true' ? true : false;
  }

  parseNumber(literal: string) {
    const number = parseFloat(literal);

    if (isNaN(number)) {
      throw new UnableToParseLiteralException(literal, JavaScriptLiteral.Number);
    }

    return number;
  }

  parseNull(literal: string): null {
    if (literal !== 'null') {
      throw new UnableToParseLiteralException(literal, JavaScriptLiteral.Null);
    }

    return null;
  }

  parseUndefined(literal: string): undefined {
    if (literal !== JavaScriptLiteral.Undefined) {
      throw new UnableToParseLiteralException(literal, JavaScriptLiteral.Undefined);
    }

    return undefined;
  }
}
