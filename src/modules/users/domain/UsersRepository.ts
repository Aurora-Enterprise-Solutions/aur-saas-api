import { PaginateResult } from '@/modules/shared/domain/paginate/types'
import User from '@/modules/users/domain/User'

export default interface UsersRepository {
  query(filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>>
  getByUsername(username: User['username']): Promise<User | null>;
}
