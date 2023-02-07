import { getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { AnyParamConstructor, BeAnObject, IModelOptions } from '@typegoose/typegoose/lib/types'
import getMongooseDatabaseConnection
  from '@/modules/shared/infrastructure/getMongoModelFromClass/getMongooseDatabaseConnection'

function getMongoModelFromClass<U extends AnyParamConstructor<any>, QueryHelpers = BeAnObject>(cl: U, options?: IModelOptions): ReturnModelType<U, QueryHelpers> {
  return getModelForClass(cl, {
    existingConnection: getMongooseDatabaseConnection(),
    ...options,
  })
}

export default getMongoModelFromClass
