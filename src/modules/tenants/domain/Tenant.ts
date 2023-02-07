import { Base } from '@typegoose/typegoose/lib/defaultClasses'

export default interface Tenant extends Base {
  cdn: string;
  name: string;
}
