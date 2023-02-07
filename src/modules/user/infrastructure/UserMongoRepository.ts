import { getModelForClass } from '@typegoose/typegoose'
import UserRepository from '@/modules/user/domain/UserRepository'
import User from '@/modules/user/domain/User'
import { UserMongoModel } from '@/modules/user/infrastructure/UserMongoModel'
import { PaginateResult } from '@/modules/shared/domain/paginate/types'

export default class UserMongoRepository implements UserRepository {
  query(filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>> {
    const UserModel = getModelForClass(UserMongoModel)
    return UserModel.paginate(filter, options)
  }

  getByUsername(username: User['username']): Promise<User | null> {
    const UserModel = getModelForClass(UserMongoModel)
    return UserModel.findOne({ username }).exec()
  }
}
