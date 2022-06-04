import style from 'styles/navbar.module.scss'
import Link from "next/link";
import Image from 'next/image'
import logo from 'assets/images/logo.png'
import { useEffect } from 'react';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';

const navLinks = [
  {
    title: '首页',
    link: '/'
  },
  // {
  //   title: '我的博客',
  //   link: '/post'
  // }
]

function Navbar(props) {
  const store = useStore()
  return (
    <header className={style.navbar}>
      <div className={style.container}>
        <Link href="/">
          <a className={style.logo}>
            <span>{'P'}</span>
            {/* <Image alt="logo" src={logo} width={40} height={40} /> */}
          </a>
        </Link>
        <div className={style['nav-links']}>
          {navLinks.map((item, index) => (
            <Link href={item.link} key={item.link + index}>
              <a className={style['nav-item']}>{item.title}</a>
            </Link>
          ))}
        </div>
        <div className={style.options}>
          <Link href="/editor/new"><a className={style['nav-item']}>新建博客</a></Link>
          {store.user.id ? (
            <Link href="/"><a className={style['nav-item']}>{store.user.name}</a></Link>
          ) : (
            <Link href='/sign_in'>
              <a className={style['nav-item']}>登录</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default observer(Navbar)