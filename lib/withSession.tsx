import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { NextApiHandler } from 'next'
import { User } from 'src/entity/User'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET as string,
  cookieName: 'blog',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false,
  },
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    currentUser?: User
  }
}

export function withSessionRoute(handle: NextApiHandler) {
  return withIronSessionApiRoute(handle, sessionOptions)
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
