import Navbar from './navbar'
import Footer from './footer'
import style from 'styles/layout.module.scss'

function Layout(props) {
  const { children } = props
  return (
    <>
      <Navbar />
      <main className={style.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout