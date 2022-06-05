import 'github-markdown-css'
import 'styles/nprogress.scss'
import 'styles/globals.scss'
import { enableStaticRendering } from 'mobx-react'
import axios from 'axios'
import { useStore } from 'hooks/useStore'
import { ReactElement, ReactNode, useEffect } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import NProgress from "nprogress"
import router from "next/router"

NProgress.configure({ showSpinner: false })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  enableStaticRendering(typeof window === 'undefined')
  const store = useStore()
  useEffect(() => {
    getUserInfo((user) => {
      if (user) {
        const { username, id } = user
        store.user.setName(username)
        store.user.setId(id)
      }
    })
  }, [])
  return getLayout(<Component {...pageProps} />)
}

router.events.on('routeChangeStart', () => NProgress.start())
router.events.on('routeChangeComplete', () => NProgress.done())
router.events.on('routeChangeError', () => NProgress.done())

function getUserInfo(next) {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/userinfo').then((response) => {
      const data = response?.data || {}
      next(data)
    })
  })
}

