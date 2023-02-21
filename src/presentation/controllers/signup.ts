export class SignUpController {
  handle (httpRequest: any): any {
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
  }
}
