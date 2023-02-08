import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import config from '@/api/config/config'

const router = express.Router()

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
        url         : `http://localhost:${config.port}/v1`,
        description : 'Development Server',
      },
    ],
  },
  apis: [ 'packages/components.yaml', 'dist/api/routes/v1/*.js' ],
})

router.use('/', swaggerUi.serve)
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
)

export default router
