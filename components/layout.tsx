// components/layout.js

import Navbar from './navbar'
import Footer from './footer'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout