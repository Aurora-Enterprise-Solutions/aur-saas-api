import config from '../config/config'

const swaggerDefinition = {
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
}

export default swaggerDefinition
