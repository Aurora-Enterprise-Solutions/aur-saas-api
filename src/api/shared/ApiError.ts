import ApiErrorCodes from '@/api/shared/ApiErrorCodes'

export type ApiErrorProps = {
  message: string;
  statusCode: number;
  isOperational?: boolean;
  stack?: string;
  internalStatusCode?: string;
  meta?: Record<string, any>;
}

export default class ApiError extends Error {
  statusCode: number
  isOperational: boolean
  internalStatusCode?: string
  meta?: Record<string, any>
  override stack?: string

  constructor({
    statusCode,
    message,
    isOperational = true,
    stack = '',
    internalStatusCode = ApiErrorCodes.UNCONTROLLED_ERROR,
    meta = {},
  }: ApiErrorProps) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.internalStatusCode = internalStatusCode
    this.meta = meta
    if (stack)
      this.stack = stack
    else
      Error.captureStackTrace(this, this.constructor)
  }
}
