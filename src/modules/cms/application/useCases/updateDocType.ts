import { NewCreatedDocType } from '@/modules/cms/domain/DocType'
import plopClient from '../utils/plop/plopClient'
import generators from '../utils/plop/generators'
import eslintUtils from '../utils/eslint'
import gitUtils from '../utils/git'

async function updateDocType(docType: NewCreatedDocType) : Promise<void> {
  await plopClient.getGenerator(generators.updateDocTypeSchema).runActions({
    fileName : docType.info.singularName,
    doctype  : {
      ...docType,
    },
  })

  eslintUtils.formatAutoGeneratedFiles()
  gitUtils.addAutoGeneratedFilesToStage()
}

export default updateDocType