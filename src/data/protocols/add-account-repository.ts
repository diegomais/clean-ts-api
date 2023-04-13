import { type AccountModel } from '../../domain/models/account'
import { type AddAccountModel } from '../../domain/usecases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
