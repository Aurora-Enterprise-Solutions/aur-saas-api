import { PaginateResult } from '@/modules/shared/domain/paginate/types'
import UsersRepository from '@/modules/users/domain/UsersRepository'
import User from '@/modules/users/domain/User'

async function queryUsers(repository: UsersRepository, filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>> {
  return await repository.query(filter, options)
}

export default queryUsers
