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

function getUserInfo() {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/userinfo').then((response) => {
      const { username } = response?.data || {}
      resolve({ username })
    })
  })
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  enableStaticRendering(typeof window === 'undefined')
  const store = useStore()
  useEffect(() => {
    getUserInfo().then(({ username }) => {
      store.user.setName(username || null)
    })
  }, [])
  return getLayout(<Component {...pageProps} />)
}

