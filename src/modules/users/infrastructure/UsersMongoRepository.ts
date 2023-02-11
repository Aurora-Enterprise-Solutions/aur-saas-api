import getMongoModelFromClass from '@/modules/shared/infrastructure/getMongoModelFromClass/getMongoModelFromClass'
import UsersRepository from '@/modules/users/domain/UsersRepository'
import User, { NewCreatedUser } from '@/modules/users/domain/User'
import PaginateResult from '@/modules/shared/domain/paginate/PaginateResult'
import { UserMongoModel } from '@/modules/users/infrastructure/UserMongoModel'

export default class UsersMongoRepository implements UsersRepository {
  async create(data: NewCreatedUser): Promise<User> {
    const UserModel = getMongoModelFromClass(UserMongoModel)
    return await UserModel.create(data) as User
  }

  async query(filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>> {
    const UserModel = getMongoModelFromClass(UserMongoModel)
    return await UserModel.paginate(filter, options) as PaginateResult<User>
  }

  async getByUsername(username: User['username']): Promise<User | null> {
    const UserModel = getMongoModelFromClass(UserMongoModel)
    return await UserModel.findOne({ username }).exec() as User
  }
}
