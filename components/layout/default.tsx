import Navbar from './navbar'
import Footer from './footer'
import style from 'styles/layout.module.scss'
import { ReactElement } from 'react'

function Layout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <main className={style.main}>{page}</main>
      <Footer />
    </>
  )
}

export default Layout