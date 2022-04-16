import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>嘟嘟嘟~ 嘟嘟嘟~</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
