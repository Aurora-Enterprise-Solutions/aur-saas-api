import { getNamespace } from 'cls-hooked'
import config from '@/api/config/config'
import { mongoConnection } from '@/api/config/db/dbConnection'
import { logger } from '@/api/utils/logger'

export default function getMongooseDatabaseConnection() {
  const dbNamespace = getNamespace(config.databaseNamespace.namespace)
  const isMgm = dbNamespace?.get(config.databaseNamespace.isMgm)
  const tenantId = dbNamespace?.get(config.databaseNamespace.tenantId)
  const dbName = isMgm ? `aur-saas-${tenantId}` : `aur-saas-tenant-${tenantId}`

  // useDb will return new connection
  const db = mongoConnection().useDb(dbName, { useCache: true })
  logger.info(`DB switched to ${dbName}`)

  return db
}
