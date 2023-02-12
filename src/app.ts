import express, { Express } from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import httpStatus from 'http-status'
import config from '@/api/config/config'
import { morgan } from '@/api/utils/logger'
import authLimiter from '@/api/utils/rateLimiter'
import swaggerRoutes from '@/api/routes/swagger.route'
import cmsRoutes from '@/api/routes/cms.route'
import v1Routes from '@/api/routes/v1'
import ApiError from '@/api/shared/ApiError'
import errorConverter from '@/api/middlewares/errorConverter'
import errorHandler from '@/api/middlewares/errorHandler'

const app: Express = express()

if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// enable cors
app.use(cors())
app.options('*', cors())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())
app.use(ExpressMongoSanitize())

// gzip compression
app.use(compression())

// jwt authentication

// limit repeated failed requests to auth endpoints
if (config.env === 'production')
  app.use('/v1/auth', authLimiter)

// swagger doc
app.use(swaggerRoutes)

// cms api routes
app.use(cmsRoutes)

// v1 api routes
app.use(v1Routes)

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError({
    statusCode : httpStatus.NOT_FOUND,
    message    : 'Not found',
  }))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
