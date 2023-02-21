import { badRequest, ok } from '../helpers/http-helper'
import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`Missing parameter: ${field}`))
      }
    }
    return ok(undefined)
  }
}
