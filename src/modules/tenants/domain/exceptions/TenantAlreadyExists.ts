export default class TenantAlreadyExists extends Error {
  constructor() {
    super('Tenant already exists')
  }
}
