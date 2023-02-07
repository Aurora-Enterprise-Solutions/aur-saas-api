import mongoose from 'mongoose'
import app from './app'
import config from './api/config/config'
import logger from './api/utils/logger/logger'

let server: any
mongoose.connect(config.mongoose.url, {
  autoCreate : false,
  autoIndex  : false,
}).then(() => {
  logger.info('Connected to MongoDB')
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  }
  else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: string) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server)
    server.close()
})
