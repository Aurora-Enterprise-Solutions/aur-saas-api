import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '@/api/config/config'
import { logger } from '@/api/utils/logger'
import ApiError from '@/api/shared/ApiError'
import ApiErrorCodes from '@/api/shared/ApiErrorCodes'

export default function errorHandler(err: ApiError, _req: Request, res: Response, _next: NextFunction) {
  let { statusCode, message, internalStatusCode } = err

  internalStatusCode = internalStatusCode || ApiErrorCodes.UNCONTROLLED_ERROR

  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = 'Internal Server Error'
    internalStatusCode = ApiErrorCodes.UNCONTROLLED_ERROR
  }

  res.locals['errorMessage'] = err.message

  const response = {
    code : statusCode,
    internalStatusCode,
    message,
    meta : err.meta,
    ...(config.env === 'development' && { stack: err.stack }),
  }

  if (config.env === 'development')
    logger.error(err)

  res.status(statusCode).send(response)
}
