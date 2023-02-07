/* eslint-disable security/detect-object-injection */
import mongoose, { Connection } from 'mongoose'
import config from '@/api/config/config'
import { logger } from '@/api/utils/logger'

const mongoConnections: Record<string, Connection | null> = {
  default: null,
}

export function openConnection(instance = 'default', dbHostUrl = config.mongoose.url) {
  try {
    const uri = getUrlWithoutFinalSlash(dbHostUrl)
    const dbConnection = mongoose.createConnection(uri, config.mongoose.options)
    logger.info(`Mongoose connection open to ${JSON.stringify(dbHostUrl)}`)
    mongoConnections[instance] = dbConnection
  }
  catch (err) {
    throw new Error(`Mongoose connection error: ${err} with connection info ${JSON.stringify(dbHostUrl)}`)
  }
}

export function mongoConnection(instance = 'default') {
  if (!mongoConnections[instance])
    openConnection(instance)

  return mongoConnections[instance] as Connection
}

function getUrlWithoutFinalSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}
