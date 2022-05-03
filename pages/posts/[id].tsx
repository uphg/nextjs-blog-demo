import { NextPage, GetStaticPaths, GetStaticPropsContext, GetServerSideProps } from "next"
import { getDataSource } from "lib/getDataSource";
import { Post } from "src/entity/Post";

type Props = {
  post: Post
}

const postsShow: NextPage<Props> = (props) => {
  const { post } = props

  return (
    post ? (
      <div>
        <h1>{post?.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: post?.content }}></article>
      </div>
    ) : null
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