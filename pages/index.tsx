import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'

interface Props {
  browser: {
    name: string;
    version: string;
    major: string;
  }
}

const Home: NextPage<Props> = (props) => {
  const { browser } = props
  const [width, setWidth] = useState(0) 
  useEffect(() => {
    const _width = document.documentElement.clientWidth
    setWidth(_width)
  }, [])
  return (
    <div>
      <h1>你的浏览器是 {browser.name}</h1>
      <h2>你的浏览器窗口大小是 {width}</h2>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()

  return {
    props: {
      browser: result.browser
    }
  }
}

export default Home