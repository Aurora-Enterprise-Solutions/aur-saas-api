import User from '@/modules/users/domain/User'

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
    tenantId: string;
  }
}
