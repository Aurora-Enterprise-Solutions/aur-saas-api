import PaginateResult from '@/modules/shared/domain/paginate/PaginateResult'
import User, { NewCreatedUser } from '@/modules/users/domain/User'

export default interface UsersRepository {
  create(data: NewCreatedUser): Promise<User>;
  query(filter: Record<string, any>, options: Record<string, any>): Promise<PaginateResult<User>>
  getByUsername(username: User['username']): Promise<User | null>;
}
