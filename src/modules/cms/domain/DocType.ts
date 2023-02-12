import DocTypeAttributeType from './DocTypeAttributeType'
import DocTypeAttributeValidators from './DocTypeAttributeValidator'
import DocTypeAttributeDatabaseConfig from './DocTypeAttributeDatabaseConfig'

interface DocType {
  referenceId: string;
  collectionName: string;
  info: {
    name: string;
    singularName: string;
    pluralName: string;
    description?: string;
  };
  options: {
    publish: boolean;
  };
  attributes: {
    [key: string]: DocTypeAttributeValidators & {
      type: DocTypeAttributeType;
      databaseConfig: DocTypeAttributeDatabaseConfig
    }
  }
}

export type NewCreatedDocType = Omit<DocType, 'referenceId'>

export default DocType
