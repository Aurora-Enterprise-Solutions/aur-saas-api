import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import httpStatus from 'http-status'
import ApiError from '@/api/shared/ApiError'
import ApiErrorCodes from '@/api/shared/ApiErrorCodes'
import User from '@/modules/users/domain/User'

function verifyCallback(req: Request, resolve: any, reject: any) {
  return async (err: Error, user: User, info: string) => {
    if (err || info || !user) {
      return reject(new ApiError({
        statusCode         : httpStatus.UNAUTHORIZED,
        internalStatusCode : ApiErrorCodes.UNAUTHORIZED,
        message            : 'Please authenticate',
      }))
    }

    req.user = user

    resolve()
  }
}

export default function auth() {
  console.log('auth')

  return async (req: Request, res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next)
    })
      .then(() => next())
      .catch((err) => next(err))
}
