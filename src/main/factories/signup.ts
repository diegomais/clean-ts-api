import { DbAddAccount } from '../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository'
import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator'
import env from '../config/env'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(env.encryptionSaltOrRounds)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(accountMongoRepository, bcryptAdapter)
  return new SignUpController(dbAddAccount, emailValidatorAdapter)
}
