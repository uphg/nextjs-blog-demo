import { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { ReactChild, useCallback, useState } from "react"
import style from 'styles/form.module.scss'

type Field<T> = {
  label?: string,
  type: 'text' | 'password' | 'textarea' | 'row',
  key?: keyof T,
  child?: ReactChild
}

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    success?: (response: AxiosResponse<T, any>) => void;
    successMessage?: string;
  }
}

export function useForm<T>(options: useFormOptions<T>) {
  const router = useRouter()
  const { initFormData, fields, buttons, submit } = options
  const [formData, setFormData] = useState(initFormData)
  const [errors, setErrors] = useState(() => {
    const result: { [k in keyof T]?: string[] } = {}
    const keys = Object.keys(initFormData)
    keys.forEach((key) => {
      result[key] = []
    })
    return result
  })

  const _onSubimt = useCallback((e) => {
    e.preventDefault()
    submit.request(formData).then((response) => {
      submit.success && submit.success(response)
    }, (e) => {
      if(e.response) {
        const response: AxiosResponse = e.response
        const { status } = response
        if (status === 422) {
          setErrors(response.data)
        } else if (status === 401) {
          window.alert('未登录，请先登录')
          const returnTo = window.location.pathname
          router.push('/sign_in').then(() => {
            router.push({ query: { returnTo }})
          })
        }
      }
    })
  }, [submit, formData])

  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({ ...formData, [key]: value })
  }, [formData, setFormData])

  return (
    <form onSubmit={_onSubimt}>
      {fields.map((item, index) => (
        <div className={style.item} key={item.key?.toString() || index}>
          <label className={style.label}>{item.label}</label>
          <div className={style.content}>
            { item.type === 'textarea' ? (
              <textarea
                value={formData[item.key].toString()}
                onChange={(e) => {
                  onChange(item.key, e.target.value)
                }}
              />
            ) : (
              item.type === 'row' ? (item.child) : (
                <input
                  className={style.input}
                  type={item.type}
                  value={formData[item.key].toString()}
                  onChange={(e) => {
                    onChange(item.key, e.target.value)
                  }}
                />
              )
            )}
            { errors[item.key]?.length > 0 && <div className={style.error}>{errors[item.key].join('，')}</div> }
          </div>
        </div>
      ))}
      <div className={style.item}>
        {buttons}
      </div>
    </form>
  )
}