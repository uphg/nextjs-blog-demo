import axios, { AxiosResponse } from "axios"
import next, { NextPage } from "next"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const SignUp: NextPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: []
  })
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    axios.post('/api/v1/users', formData).then((response) => {
      window.alert('注册成功')
      router.push('/sign_in')
    }, (error) => {
      if (error.response) {
        const response: AxiosResponse = error.response
        if (response.status === 422) {
          setErrors({ ...errors, ...response.data })
        }
      }
    })
  }, [formData])
  return (
    <>
      <h2>注册</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <span>用户名</span>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  username: e.target.value 
                })
              }}
            />
          </label>
          { errors.username.length > 0 && <span>{errors.username.join('，')}</span> }
        </div>
        <div>
          <label>
            <span>密码</span>
            <input type="password" value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value 
                })
              }}
            />
          </label>
          { errors.password.length > 0 && <span>{errors.password.join('，')}</span> }
        </div>
        <div>
          <label>
            <span>重复密码</span>
            <input type="password" value={formData.passwordConfirmation}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  passwordConfirmation: e.target.value 
                })
              }}
            />
          </label>
          { errors.passwordConfirmation.length > 0 && <span>{errors.passwordConfirmation.join('，')}</span> }
        </div>
        <div>
          <button type="submit">提交</button>
        </div>
      </form>
    </>
  )
}

export default SignUp