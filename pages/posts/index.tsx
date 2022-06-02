import { GetServerSideProps, NextPage } from 'next'
import { usePosts, PostsProps } from 'hooks/usePosts'
import LayoutDefault from 'components/layout/default'
import { getPaginationPost } from 'lib/getPaginationPost'

const PostsIndex = (props: PostsProps) => {
  const posts = usePosts(props)
  return (
    <div>
      <h2>我的博客列表</h2>
      {posts}
    </div>
  )
}

PostsIndex.getLayout = LayoutDefault

export const getServerSideProps: GetServerSideProps = getPaginationPost

export default PostsIndex