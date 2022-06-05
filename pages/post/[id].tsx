import { GetServerSideProps } from "next"
import { getDataSource } from "lib/getDataSource";
import { Post } from "src/entity/Post";
import style from 'styles/post.module.scss'
import { NextPageWithLayout } from "pages/_app";
import LayoutDefault from 'components/layout/default'
import { marked } from 'marked';
import classnames from 'classnames'
import Link from "next/link";
import { observer } from "mobx-react";
import { useStore } from "hooks/useStore";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  post: Post
}

const postShow: NextPageWithLayout<Props> = (props) => {
  const store = useStore()
  const router = useRouter()
  const { post } = props
  const onRemove = () => {
    const result = window.confirm('确定删除？')
    if (result) {
      axios.delete(`/api/v1/post/${post.id}`).then(() => {
        router.push('/')
      })
    }
  }
  return (
    post ? (
      <div className={style.container}>
        <h1 className={style.header}>
          <span className={style.title}>{post.title}</span>
          {post.authorId === store.user.id && (
            <span className={style.options}>
              <Link  href={`/editor/${post.id}`}>
                <a className={style['option-item']}>编辑</a>
              </Link>
              <button className={style['option-item']} onClick={onRemove}>删除</button>
            </span>
          )}
        </h1>
        <article
          className={classnames(style.content, 'markdown-body')}
          dangerouslySetInnerHTML={{ __html: marked(post?.content) }}
        ></article>
      </div>
    ) : null
  )
}

postShow.getLayout = LayoutDefault

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

export default observer(postShow)