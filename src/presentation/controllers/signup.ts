import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest, internalServerError, ok } from '../helpers/http-helper'
import {
  type Controller,
  type EmailValidator,
  type HttpRequest,
  type HttpResponse
} from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return ok(undefined)
    } catch (error) {
      return internalServerError(new ServerError())
    }
  }
}
