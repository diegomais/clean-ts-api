import { type AccountModel } from '../../domain/models/account'
import { type AddAccountModel } from '../../domain/usecases/add-account'
import { type AddAccountRepository } from '../protocols/add-account-repository'
import { type Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        ...accountData,
        id: 'valid_id'
      }
      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }

  class EncrypterStub {
    async encrypt (_value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(addAccountRepositoryStub, encrypterStub)
  return {
    sut,
    addAccountRepositoryStub,
    encrypterStub
  }
}

describe('DbAddAccount Use-Case', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.execute(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((_resolve, reject) => { reject(new Error()) })
    )
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.execute(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.execute(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((_resolve, reject) => { reject(new Error()) })
    )
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.execute(accountData)
    await expect(promise).rejects.toThrow()
  })
})
