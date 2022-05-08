import { AxiosResponse } from "axios"
import { ReactChild, useCallback, useState } from "react"

type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',
  key: keyof T
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
        if(response.status === 422) {
          setErrors(response.data)
        }
      }
    })
  }, [submit, formData])

  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({ ...formData, [key]: value })
  }, [formData, setFormData])

  return (
    <form onSubmit={_onSubimt}>
      {fields.map((item) => (
        <div key={item.key.toString()}>
          <label>
            <span>{item.label}</span>
            { item.type === 'textarea' ? (
              <textarea
                value={formData[item.key].toString()}
                onChange={(e) => {
                  onChange(item.key, e.target.value)
                }}
              />
            ) : (
              <input
                type={item.type}
                value={formData[item.key].toString()}
                onChange={(e) => {
                  onChange(item.key, e.target.value)
                }}
              />
            ) }
          </label>
          { errors[item.key].length > 0 && <span>{errors[item.key].join('，')}</span> }
        </div>
      ))}
      <div>
        {buttons}
      </div>
    </form>
  )
}