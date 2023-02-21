import { type Controller } from '../protocols/controller'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing parameter: ${field}`)
        }
      }
    }
    return { body: undefined, statusCode: 200 }
  }
}
