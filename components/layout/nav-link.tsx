import Link from "next/link"
import style from 'styles/navbar.module.scss'

const NavLink = (props) => {
  return (
    <Link href={props.link}>
      <a className={style['nav-link']}>{props.children}</a>
    </Link>
  )
}

export default NavLink