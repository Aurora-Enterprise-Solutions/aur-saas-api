export default interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  email?: string;
}

export type NewCreatedUser = Omit<User, 'id'>
