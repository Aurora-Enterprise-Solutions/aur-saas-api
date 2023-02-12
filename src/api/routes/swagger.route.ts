import express, { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import config from '@/api/config/config'

const router: Router = express.Router()
const swaggerRouter: Router = express.Router()

const specs = swaggerJsdoc({
  swaggerDefinition: {
    openapi : '3.0.0',
    info    : {
      title       : 'Aurora SaaS API documentation',
      version     : '1.0.0',
      description : 'This is the official documentation for the Aurora SaaS API.',
    },
    servers: [
      {
        url         : `http://localhost:${config.port}/`,
        description : 'Development Server',
      },
    ],
  },
  apis: [
    'swagger/**/*.yaml',
    'dist/api/routes/**/*.js',
    config.env === 'development' ? 'dist/modules/cms/infrastructure/http/*.js' : '',
  ],
})

swaggerRouter.use('/', swaggerUi.serve)
swaggerRouter.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
)

if (config.env === 'development')
  router.use('/docs', swaggerRouter)

export default router
