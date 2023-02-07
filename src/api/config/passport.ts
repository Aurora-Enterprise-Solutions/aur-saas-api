import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import tokenTypes from '@/api/shared/token.types'
import config from '@/api/config/config'
import User from '@/modules/user/user.model'
import UserModel from '@/modules/auth/domain/UserModel'
import TokenPayload from '@/modules/auth/domain/TokenPayload'

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey    : config.jwt.secret,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: TokenPayload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS)
        throw new Error('Invalid token type')

      const user: UserModel | null = await User.findById(payload.sub)
      if (!user)
        return done(null, false)

      done(null, user)
    }
    catch (error) {
      done(error, false)
    }
  },
)

export default jwtStrategy
