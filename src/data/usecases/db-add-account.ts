import { type AccountModel } from '../../domain/models/account'
import { type AddAccount, type AddAccountModel } from '../../domain/usecases/add-account'
import { type AddAccountRepository } from '../protocols/add-account-repository'
import { type Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository
  private readonly encrypter: Encrypter

  constructor (addAccountRepository: AddAccountRepository, encrypter: Encrypter) {
    this.addAccountRepository = addAccountRepository
    this.encrypter = encrypter
  }

  async execute (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return await new Promise(resolve => { resolve({ id: 'any_id', ...accountData }) })
  }
}
