import { getModelForClass } from '@typegoose/typegoose'
import UsersRepository from '@/modules/users/domain/UsersRepository'
import User from '@/modules/users/domain/User'
import { UserMongoModel } from '@/modules/users/infrastructure/UserMongoModel'
import { PaginateResult } from '@/modules/shared/domain/paginate/types'

export default class UserMongoRepository implements UsersRepository {
  query(filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>> {
    const UserModel = getModelForClass(UserMongoModel)
    return UserModel.paginate(filter, options)
  }

  getByUsername(username: User['username']): Promise<User | null> {
    const UserModel = getModelForClass(UserMongoModel)
    return UserModel.findOne({ username }).exec()
  }
}
