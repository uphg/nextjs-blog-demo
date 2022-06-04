
import { GetServerSideProps } from 'next'
import { Post } from 'src/entity/Post'
import LayoutDefault from 'components/layout/default'
import { getPaginationPost } from 'lib/getPaginationPost'
import { NextPageWithLayout } from '../_app'
import { usePosts } from 'hooks/usePosts'
import { observer } from 'mobx-react'

interface Props {
  posts: Post[];
  count: number;
  page: number;
  total: number;
}

const Posts: NextPageWithLayout<Props> = (props) => {
  const posts = usePosts(props)
  return (
    <div className='posts-container'>
      {posts}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = getPaginationPost

Posts.getLayout = LayoutDefault

export default observer(Posts)