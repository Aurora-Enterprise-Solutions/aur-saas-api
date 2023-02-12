import { NodePlopAPI } from 'node-plop'
import jsonHelper from './helpers/jsonHelper'
import createDocTypeSchema from './generators/createDocTypeSchema'

export default async function (plop: NodePlopAPI) {
  // load custom actions
  await plop.load('plop-pack-remove')

  // set helpers
  plop.setHelper('json', jsonHelper)

  // create your generators here
  plop.setGenerator(createDocTypeSchema.name, createDocTypeSchema.generator)
};
