import { Request } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
import Tweet from '~/models/schemas/Tweet.schema'
import User from '~/models/schemas/Users.Schema'
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
  }
}
