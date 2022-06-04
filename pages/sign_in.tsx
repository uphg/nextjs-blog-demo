import axios from "axios"
import qs from 'query-string'
import { useForm } from "hooks/useForm"
import { withSessionSsr } from "lib/withSession"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { User } from "src/entity/User"

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
      }
    ],
    submit: {
      request: (formData) => axios.post('/api/v1/session', formData),
      success: () => {
        window.alert('登录成功')
        const query = qs.parse(window.location.search)
        if (query.returnTo) {
          const path = query.returnTo.toString()
          router.push(path)
        } else {
          router.push('/')
        }
      }
    },
    buttons: <button type="submit">登录</button>
  })

  return (
    <>
      {props.user && <div>
      当前登录用户为：{props.user.username}
      </div>}
      <h2>登录</h2>
      {form}
    </>
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