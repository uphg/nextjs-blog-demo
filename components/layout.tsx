import Navbar from './navbar'
import Footer from './footer'
import style from 'styles/layout.module.scss'
import { useEffect } from 'react'

function Layout(props) {
  const { children } = props
  useEffect(() => {
    console.log('props')
    console.log(props)
  })
  return (
    <>
      <Navbar />
      <main className={style.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout