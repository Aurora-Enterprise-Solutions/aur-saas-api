import * as path from 'path'
import { PlopGenerator } from '@/modules/cms/application/utils/plop/types'
import config from '../../../config/config'
import generators from '../generators'

const generator: PlopGenerator = {
  name      : generators.createDocTypeSchema,
  generator : {
    description : 'Create a new DocType Schema',
    prompts     : [
      { name: 'fileName', type: 'string' },
      { name: 'doctype', type: 'string' },
    ],
    actions: [
      {
        type         : 'add',
        path         : path.join(process.cwd(), config.output, 'doctypes/{{camelCase fileName}}.ts'),
        templateFile : 'templates/doctype.ts.hbs',
        data         : {
          ...config,
        },
        abortOnFail: true,
      },
    ],
  },
}

export default generator
