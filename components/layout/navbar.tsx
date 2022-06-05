import style from 'styles/navbar.module.scss'
import Link from "next/link";
import Image from 'next/image'
import logo from 'assets/images/logo.png'
import axios from 'axios';
import { useEffect } from 'react';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import NavLink from './nav-link';

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
  const router = useRouter()

  const onLogout = () => {
    axios.put('/api/v1/session/clear').then(() => {

      window.alert('退出登录成功')
      router.reload()
    })
  }
  return (
    <header className={style.container}>
      <div className={style.wrap}>
        {/* <Link href="/">
          <a className={style.logo}>
            <span>{'P'}</span>
            <Image alt="logo" src={logo} width={40} height={40} />
          </a>
        </Link> */}
        <div className={style['nav-links']}>
          {navLinks.map((item, index) => (
            <NavLink link={item.link} key={item.link + index}>{item.title}</NavLink>
            // <Link href={item.link} key={item.link + index}>
            //   <a className={style['nav-item']}>{item.title}</a>
            // </Link>
          ))}
        </div>
        <div className={style.options}>
          {store.user.id ? (
            <>
              <NavLink link="/editor/new">新建博客</NavLink>
              <button className={style['option-button']} onClick={onLogout}>退出登录</button>
              <NavLink link={`/user/${store.user.id}`}>{store.user.name}</NavLink>
            </>
          ) : (
            <NavLink link="/sign_in">登录</NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default observer(Navbar)