import { NextFunction, Request, Response } from 'express'
import ApiError from '@/api/shared/ApiError'
import mongoose from 'mongoose'
import httpStatus from 'http-status'

export default function errorConverter(err: any, _req: Request, _res: Response, next: NextFunction) {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
    const message: string = error.message || `${httpStatus[statusCode]}`
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}
