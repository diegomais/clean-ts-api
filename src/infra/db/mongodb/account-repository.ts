import { type AddAccountRepository } from '../../../data/protocols/add-account-repository'
import { type AccountModel } from '../../../domain/models/account'
import { type AddAccountModel } from '../../../domain/usecases/add-account'
import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    return { ...accountData, id: insertedId.toHexString() }
  }
}
