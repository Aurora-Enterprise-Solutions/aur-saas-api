import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import httpStatus from 'http-status'
import ApiError from '@/api/shared/ApiError'
import User from '@/modules/user/domain/User'

function verifyCallback(req: Request, resolve: any, reject: any) {
  return async (err: Error, user: User, info: string) => {
    if (err || info || !user)
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'))

    req.user = user

    resolve()
  }
}

export default function auth() {
  return async (req: Request, res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next)
    })
      .then(() => next())
      .catch((err) => next(err))
}
