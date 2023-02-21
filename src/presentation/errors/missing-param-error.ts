export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing parameter: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
