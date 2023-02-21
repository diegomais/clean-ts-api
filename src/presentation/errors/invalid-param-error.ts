export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid parameter: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
