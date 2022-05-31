import 'styles/globals.scss'
import Layout from 'components/layout'
import { enableStaticRendering } from 'mobx-react'
import axios from 'axios'
import { useStore } from 'hooks/useStore'
import { useEffect } from 'react'


let count = 0
async function initUserInfo() {
  if (count === 1) return
  count = 1
  const store = useStore()
  console.log('store.user.name')
  console.log(store.user.name)
  !store.user.name && axios.get('/api/v1/userinfo').then((response) => {
    const { username } = response?.data || {}
    store.user.setName(username || null)
  })
}

export default function MyApp(options) {
  const { Component, pageProps } = options
  enableStaticRendering(typeof window === 'undefined')
  initUserInfo()
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

