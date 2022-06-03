import 'styles/globals.scss'
import { enableStaticRendering } from 'mobx-react'
import axios from 'axios'
import { useStore } from 'hooks/useStore'
import { ReactElement, ReactNode, useEffect } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function getUserInfo(next) {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/userinfo').then((response) => {
      const data = response?.data || {}
      next(data)
    })
  })
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  enableStaticRendering(typeof window === 'undefined')
  const store = useStore()
  useEffect(() => {
    getUserInfo(({ username, id }) => {
      store.user.setName(username)
      store.user.setId(id)
    })
  }, [])
  return getLayout(<Component {...pageProps} />)
}

