import { type AccountModel } from '../models/account'

export interface AddAccountModel {
  email: string
  name: string
  password: string
}

export interface AddAccount {
  execute: (account: AddAccountModel) => Promise<AccountModel>
}
