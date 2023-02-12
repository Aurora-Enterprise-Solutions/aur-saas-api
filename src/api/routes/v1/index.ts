import express, { Router } from 'express'
import config from '../../config/config'
import path from 'path'

const router = express.Router()

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [

]

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
]

defaultIRoute.forEach((route) => {
  router.use(path.join('/v1', route.path), route.route)
})

if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(path.join('/v1', route.path), route.route)
  })
}

export const routes = [ ...defaultIRoute, ...devIRoute ]

export default router
