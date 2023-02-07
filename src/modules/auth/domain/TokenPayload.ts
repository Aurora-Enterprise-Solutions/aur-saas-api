import { JwtPayload } from 'jsonwebtoken'

export default interface TokenPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}
