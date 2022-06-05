import { AxiosResponse } from "axios"
import { useCallback, useState } from "react"
import { Input } from 'antd'
import style from 'styles/editor.module.scss'
import Link from "next/link"
import NavLink from "components/layout/nav-link"

type FormData = { title?: string, content?: string }

type useEditorOptions = FormData & {
  submit: {
    text: string;
    request: (formData: FormData) => void | Promise<void | AxiosResponse<FormData, any>>;
  }
}

export function useEditor(props: useEditorOptions) {
  const [formData, setFormData] = useState({
    title: props.title || '',
    content: props.content || ''
  })

  const onSubmit = useCallback(() => {
    const { title, content } = formData
    if (!title) {
      window.alert('标题不能为空')
      return
    }

    if (!content) {
      window.alert('内容不能为空')
      return
    }
    props.submit.request({ title, content })
  }, [formData])

  return (
    <>
      <header className={style.header}>
        <div className={style.options}>
          <NavLink to="/">首页</NavLink>
          <div className={style['options-wrap']}>
            <button className="button" onClick={onSubmit}>{props.submit.text}</button>
          </div>
        </div>
      </header>
      <div className={style.draft}>
        <div className={style.title}>
          <input
            className={style['title-input']}
            type="text"
            placeholder="输入文章标题..."
            value={formData.title}
            onInput={(event) => {
              const el = event.target as HTMLInputElement
              setFormData({
                content: formData.content,
                title: el.value
              })
            }}
          />
        </div>
        <div className={style.main}>
          <Input.TextArea
            className="editor-textarea"
            value={formData.content}
            onChange={e => setFormData({
              content: e.target.value,
              title: formData.title
            })}
            placeholder="输入内容..."
            autoSize={true}
          />
        </div>
      </div>
    </>
  )
}
