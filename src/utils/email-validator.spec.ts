import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator'

jest.mock('validator', () => ({
  isEmail: (): boolean => true
}))

function makeSut (): EmailValidatorAdapter {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const email = 'any_email@mail.com'
    sut.isValid(email)
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })
})
