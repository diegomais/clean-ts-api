import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  it('should return statusCode 400 and an error if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@example.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing parameter: name'))
  })
})
