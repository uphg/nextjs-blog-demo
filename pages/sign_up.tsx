import axios from "axios"
import { useForm } from "hooks/useForm"
import { NextPage } from "next"
import { useRouter } from "next/router"

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
      }
    ],
    submit: {
      request: (formData) => axios.post('/api/v1/users', formData),
      success: () => { router.push('/sign_in') },
      successMessage: '注册成功'
    },
    buttons: <button type="submit">提交</button>
  })

  return (
    <>
      <h2>注册</h2>
      {form}
    </>
  )
}

export default SignUp