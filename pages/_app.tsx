import 'styles/globals.scss'
import Layout from 'components/layout'
import { enableStaticRendering } from 'mobx-react'
import axios from 'axios'
import { useStore } from 'hooks/useStore'
import { useEffect } from 'react'

function getUserInfo() {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/userinfo').then((response) => {
      const { username } = response?.data || {}
      resolve({ username })
    })
  })
}

export default function MyApp(options) {
  const { Component, pageProps } = options
  enableStaticRendering(typeof window === 'undefined')
  const store = useStore()
  useEffect(() => {
    getUserInfo().then(({ username }) => {
      store.user.setName(username || null)
    })
  }, [])
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

