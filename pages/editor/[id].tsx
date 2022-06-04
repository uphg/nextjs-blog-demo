import { NextPage, GetServerSideProps } from "next"
import { getDataSource } from "lib/getDataSource";
import { Post } from "src/entity/Post";
import { useRouter } from "next/router";
import { useEditor } from "hooks/useEditor";
import axios from "axios";

type Props = {
  post: Post
}

const postsShow = (props: Props) => {
  const router = useRouter()
  const { title, content } = props.post

  const editor = useEditor({
    title,
    content,
    submit: {
      text: '保存',
      request: ({ title, content }) => {
        const postId = props.post.id
        axios.patch(`/api/v1/post/${postId}`, { title, content })
          .then(() => {
            window.alert('编辑成功')
            router.push(`/post/${postId}`)
          })
      }
    }
  })

  return (
    <>
      {editor}
    </>
  )
}

export default postsShow

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
  const appDataSource = await getDataSource()
  const post = await appDataSource.manager.findOne(Post, {
    where: {
      id: context.params.id
    }
  })
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}