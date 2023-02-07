import User from '@/modules/user/domain/User'

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
    tenantId: string;
  }
}
