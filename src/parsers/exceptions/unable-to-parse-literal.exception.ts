export class UnableToParseLiteralException extends Error {
  constructor(literal: string, type: string) {
    super(`Unable to parse literal "${literal}" into required type "${type}"`);
    this.name = 'UnableToParseLiteralException';
  }
}
