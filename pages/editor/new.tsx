import axios from "axios"
// import { useForm } from "hooks/useForm"
import { NextPage } from "next"
// import { useCallback, useEffect, useRef, useState } from "react"
// import { Input } from 'antd'
// import style from 'styles/editor.module.scss'
// import { message } from 'antd';
import { useRouter } from "next/router"
import { useEditor } from "hooks/useEditor"

const NewPost: NextPage= () => {
  const router = useRouter()

  const editor = useEditor({
    submit: {
      text: '提交',
      request: ({ title, content }) => axios.post('/api/v1/post', { title, content }).then(() => {
        window.alert('发布成功')
        router.push('/post')
      })
    }
  })

  return (
    <>
      {editor}
    </>
  )
}

export default NewPost