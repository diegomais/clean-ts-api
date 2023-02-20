export class SignUpController {
  handle (httpRequest: any): any {
    return {
      body: new Error('Missing parameter: name'),
      statusCode: 400
    }
  }
}
