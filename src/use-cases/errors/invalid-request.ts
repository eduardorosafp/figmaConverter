export class InvalidRequestError extends Error {
  constructor() {
    super('HTML e/ou SECTION não foram informados.')
  }
}