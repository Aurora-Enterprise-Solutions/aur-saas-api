import express, { Router } from 'express'
import config from '@/api/config/config'
import cmsRoute from '@/modules/cms/infrastructure/http/route'

const router: Router = express.Router()

if (config.env === 'development')
  router.use('/cms', cmsRoute)

export default router
