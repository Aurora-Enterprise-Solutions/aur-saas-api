export interface Tenant {
  id: string;
  cdn: string;
  name: string;
}

export type NewCreatedTenant = Exclude<Tenant, 'id'>
