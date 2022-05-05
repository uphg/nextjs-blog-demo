import axios, { AxiosResponse } from "axios"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const SignIn: NextPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  })
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    axios.post('/api/v1/sessions', formData).then((response) => {
      window.alert('登录成功')
      router.push('/')
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
      <h2>登录</h2>
      <p>{JSON.stringify(formData)}</p>
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
          <button type="submit">提交</button>
        </div>
      </form>
    </>
  )
}

export default SignIn