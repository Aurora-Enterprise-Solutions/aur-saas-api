import Joi from 'joi'
import 'dotenv/config'

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV                              : Joi.string().valid('production', 'development', 'test').required(),
    PORT                                  : Joi.number().default(3000),
    MONGODB_URL                           : Joi.string().required().description('Mongo DB url'),
    AUR_SAAS_MGM_KEY                      : Joi.string().description('Aur Saas Management Database Key').default('mgm'),
    JWT_SECRET                            : Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES         : Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS           : Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES : Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST      : Joi.string().description('server that will send the emails'),
    SMTP_PORT      : Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME  : Joi.string().description('username for email server'),
    SMTP_PASSWORD  : Joi.string().description('password for email server'),
    EMAIL_FROM     : Joi.string().description('the from field in the emails sent by the application'),
    CLIENT_URL     : Joi.string().required().description('Client url'),
    CMS_MODULE_DIR : Joi.string().required().description('CMS module directory location'),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error)
  throw new Error(`Config validation error: ${error.message}`)


const config = {
  env     : envVars.NODE_ENV,
  port    : envVars.PORT,
  tenancy : {
    requestKey         : 'aur-req-key',
    loginPageKey       : 'login',
    managementTenantId : envVars.AUR_SAAS_MGM_KEY,
  },
  databaseNamespace: {
    namespace : 'database',
    tenantId  : 'tenantId',
    isMgm     : 'isMgm',
  },
  mongoose: {
    url     : envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options : {
      autoIndex  : false,
      autoCreate : false,
    },
  },
  jwt: {
    secret                         : envVars.JWT_SECRET,
    accessExpirationMinutes        : envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays          : envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes : envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes   : envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    cookieOptions                  : {
      httpOnly : true,
      secure   : envVars.NODE_ENV === 'production',
      signed   : true,
    },
  },
  email: {
    smtp: {
      host : envVars.SMTP_HOST,
      port : envVars.SMTP_PORT,
      auth : {
        user : envVars.SMTP_USERNAME,
        pass : envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  clientUrl : envVars.CLIENT_URL,
  cms       : {
    modulePath: envVars.CMS_MODULE_DIR,
  },
}

export default config
