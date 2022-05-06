import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { NextApiHandler } from 'next'
import { User } from 'src/entity/User'

export const sessionOptions: IronSessionOptions = {
  // password: process.env.SECRET_COOKIE_PASSWORD as string,
  password: '4821e0cd-9ad5-468a-a0f9-437a4d29ef1e',
  cookieName: 'blog',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
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
