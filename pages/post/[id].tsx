import {  GetServerSideProps } from "next"
import { getDataSource } from "lib/getDataSource";
import { Post } from "src/entity/Post";
import style from 'styles/post.module.scss'
import { NextPageWithLayout } from "pages/_app";
import LayoutDefault from 'components/layout/default'
import { marked } from 'marked';

type Props = {
  post: Post
}

const postShow: NextPageWithLayout<Props> = (props) => {
  const { post } = props
  return (
    post ? (
      <div className={style.article}>
        <h1 className={style.title}>{post.title}</h1>
        <article className={style.content} dangerouslySetInnerHTML={{ __html: marked(post?.content) }}></article>
      </div>
    ) : null
  )
}

postShow.getLayout = LayoutDefault

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

export default postShow