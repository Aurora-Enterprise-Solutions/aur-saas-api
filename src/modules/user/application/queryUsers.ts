import { PaginateResult } from '@/modules/shared/domain/paginate/types'
import UserRepository from '@/modules/user/domain/UserRepository'
import User from '@/modules/user/domain/User'

async function queryUsers(repository: UserRepository, filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>> {
  return await repository.query(filter, options)
}

export default queryUsers
