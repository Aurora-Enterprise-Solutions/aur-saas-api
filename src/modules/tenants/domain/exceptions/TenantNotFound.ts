export default class TenantNotFound extends Error {
  constructor() {
    super('Tenant not found')
  }
}
