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
      text: '提交',
      request: ({ title, content }) => axios.patch(`/api/v1/post${props.post.id}`, { title, content }).then(() => {
        // window.alert('发布成功')
        // router.push('/posts')
      })
    }
  })

  return (
    {editor}
  )
}

export default postsShow

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
  const myDataSource = await getDataSource()
  const post = await myDataSource.manager.findOne(Post, {
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