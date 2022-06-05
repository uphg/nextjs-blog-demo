import axios from "axios"
import { useForm } from "hooks/useForm"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import style from 'styles/login-or-sigup.module.scss'

const SignUp: NextPage = () => {
  const router = useRouter()
  const form = useForm({
    initFormData: {
      username: '',
      password: '',
      passwordConfirmation: ''
    },
    fields: [
      {
        label: '用户名',
        type: 'text',
        key: 'username'
      },
      {
        label: '密码',
        type: 'password',
        key: 'password'
      },
      {
        label: '确认密码',
        type: 'password',
        key: 'passwordConfirmation'
      },
      {
        type: 'row',
        child: (
          <span className={style.remark}>已有账号？去<Link href='/login'>
            <a className={style.link}>登录</a>
          </Link></span>
        )
      }
    ],
    submit: {
      request: (formData) => axios.post('/api/v1/user', formData),
      success: () => {
        window.alert('注册成功')
        router.push('/login')
      }
    },
    buttons: <button className="button submit" type="submit">提交</button>
  })

  return (
    <div className={style.container}>
      <div className={style.wrap}>
        <h2 className={style.title}>注册</h2>
        {form}
      </div>
    </div>
  )
}

export default SignUp