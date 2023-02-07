import { Base } from '@typegoose/typegoose/lib/defaultClasses'

export default interface User extends Base {
  id: string;
  username: string;
  password: string;
  email?: string;
}
