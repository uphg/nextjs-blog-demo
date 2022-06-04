import { GetServerSideProps, NextPage } from 'next'
import { usePosts, PostsProps } from 'hooks/usePosts'
import LayoutDefault from 'components/layout/default'
import { NextPageWithLayout } from 'pages/_app'
import { getDataSource } from 'lib/getDataSource'
import getQuery from 'lib/getQuery'
import { Post } from 'src/entity/Post'
import { withSessionSsr } from 'lib/withSession'
import { observer } from 'mobx-react'

const PostsIndex: NextPageWithLayout<PostsProps> = (props) => {
  const posts = usePosts(props)
  return (
    <>
      <div className='user-post'>
        <h2 className='title'>我的博客列表</h2>
        {posts}
      </div>
      <style jsx>{`
      .title {
        padding-left: 16px;
      }
      `}</style>
    </>
  )
}

PostsIndex.getLayout = LayoutDefault

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSessionSsr(async (context) => {
  // 获取分页
  const authorId = context.params.id
  const appDataSource = await getDataSource()
  const perPage = 5
  const url = context.req.url
  const query = getQuery(url)
  const page = parseInt(query.page?.toString()) || 1
  const [posts, count] = await appDataSource.manager.findAndCount(Post, {
    skip: (page - 1) * perPage,
    take: perPage,
    where: {
      authorId: authorId
    }
  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts || null)),
      count,
      page,
      total: Math.ceil(count / perPage)
    }
  }
})

export default observer(PostsIndex)