import ApiError from '@/api/shared/ApiError'
import { NextFunction, Request, Response } from 'express'
import config from '@/api/config/config'
import httpStatus from 'http-status'
import { logger } from '@/api/utils/logger'

export default function errorHandler(err: ApiError, _req: Request, res: Response, _next: NextFunction) {
  let { statusCode, message } = err
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = 'Internal Server Error'
  }

  res.locals['errorMessage'] = err.message

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  }

  if (config.env === 'development')
    logger.error(err)

  res.status(statusCode).send(response)
}
