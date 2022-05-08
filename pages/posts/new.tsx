import axios from "axios"
import { useForm } from "hooks/useForm"
import { NextPage } from "next"

const NewPost: NextPage= () => {
  const form = useForm({
    initFormData: {
      title: '',
      content: ''
    },
    fields: [
      {
        label: '标题',
        type: 'text',
        key: 'title'
      },
      {
        label: '内容',
        type: 'textarea',
        key: 'content'
      }
    ],
    submit: {
      request: (FormData) => axios.post('/api/v1/posts', FormData),
      successMessage: '创建成功'
    },
    buttons: <button type="submit">提交</button>
  })
  return (
    <>
      <h2>创建博客</h2>
      {form}
    </>
  )
}

export default NewPost