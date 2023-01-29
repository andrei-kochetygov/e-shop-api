import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { chain, isEmpty, reduce, split } from 'lodash';
import { isObject, isString } from 'lodash';
import { LiteralParsingService } from 'parsers/literal-parsing.service';

type JavaScriptType = string | number | boolean | null | undefined;

@Injectable()
export class EnvService {
  private variables: Record<string, JavaScriptType> = {};

  constructor(private literalParsingService: LiteralParsingService) {}

  public get(key: string): JavaScriptType {
    return this.variables[key];
  }

  public set(key: string, value: JavaScriptType) {
    this.variables[key] = value;
  }

  public delete(key: string) {
    delete this.variables[key];
  }

  public load(filename: string): void {
    const env = readFileSync(filename, 'utf8');
    const lines = split(env, '\n');
    this.variables = chain(lines)
      .filter((line) => !isEmpty(line))
      .map((line) => split(line, '='))
      .reduce(
        (variables, [key, literal]) => ({ ...variables, [key]: this.literalParsingService.tryParse(literal) }),
        {} as Record<string, string>,
      )
      .value();
  }

  public save(filename: string): void {
    const newEnvFileContent = reduce(
      this.variables,
      (content, value, key) => {
        if (isObject(value)) {
          throw new Error("Object isn't allowed as env variable value.");
        }

        if (isString(value)) {
          return `${content}${key}="${value}"\n`;
        }

        return `${content}${key}=${value}\n`;
      },
      '',
    );

    writeFileSync(filename, newEnvFileContent);
  }
}
