import Joi from 'joi'
import 'dotenv/config'
import Configuration from '@/modules/cms/domain/Configuration'

const envVarsSchema = Joi.object()
  .keys({
    CMS_MODULE_DIR            : Joi.string().required().description('Path were the CMS module is located in project'),
    CMS_OUTPUT_DIR            : Joi.string().required().description('Path were files will be generated'),
    CMS_MIGRATIONS_OUTPUT_DIR : Joi.string().required().description('Path were the migrations will be generated'),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error)
  throw new Error(`Config validation error: ${error.message}`)

const config: Configuration = {
  cmsModuleDir     : envVars.CMS_MODULE_DIR,
  output           : envVars.CMS_OUTPUT_DIR,
  outputMigrations : envVars.CMS_MIGRATIONS_OUTPUT_DIR,
}

export default config
