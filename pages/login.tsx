import axios from "axios"
import qs from 'query-string'
import { useForm } from "hooks/useForm"
import { withSessionSsr } from "lib/withSession"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { User } from "src/entity/User"
import style from 'styles/login-or-sigup.module.scss'
import Link from "next/link"

const SignIn: NextPage<{ user: User }> = (props) => {
  const router = useRouter()
  const form = useForm({
    initFormData: {
      username: '',
      password: ''
    },
    fields: [
      {
        label: '用户名',
        type: 'text',
        key: 'username',
      },
      {
        label: '密码',
        type: 'password',
        key: 'password'
      },
      {
        type: 'row',
        child: (
          <span className={style.remark}>还没有账号？去<Link href='/signup'>
            <a className={style.link}>注册</a>
          </Link></span>
        )
      }
    ],
    submit: {
      request: (formData) => axios.post('/api/v1/session', formData),
      success: () => {
        window.alert('登录成功')
        const query = qs.parse(window.location.search)
        router.push(query.returnTo ? query.returnTo.toString() : '/').then(() => {
          router.reload()
        })
      }
    },
    buttons: <button className="button submit" type="submit">登录</button>
  })

  return (
    <div className={style.container}>
      <div className={style.wrap}>
        <h2 className={style.title}>登录</h2>
        {form}
      </div>
    </div>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = withSessionSsr(async function getServerSideProps(context) {
  const user = context.req.session.currentUser || null
  return {
    props: {
      user: user
    }
  }
})