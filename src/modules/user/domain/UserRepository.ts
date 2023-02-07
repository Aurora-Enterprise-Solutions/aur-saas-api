import { PaginateResult } from '@/modules/shared/domain/paginate/types'
import User from '@/modules/user/domain/User'

export default interface UserRepository {
  query(filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>>
  getByUsername(username: User['username']): Promise<User | null>;
}
