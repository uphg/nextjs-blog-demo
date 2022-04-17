import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { getPost, getPostIds } from "lib/posts"
import Post from 'interface/post';

type Props = {
  post: Post
}

const postsShow: NextPage<Props> = (props) => {
  const { post } = props

  return (
    post ? <div>
      <h1>{post?.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post?.htmlContent }}></article>
    </div> : null
  )
}

export default postsShow

export const getStaticPaths: GetStaticPaths = async () => {
  const ids: string[] = await getPostIds()

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: true
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
  const id = context.params?.id || ''
  const post = await getPost(id)

  return {
    props: {
      post: post
    }
  }
}