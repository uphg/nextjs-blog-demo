import style from 'styles/home.module.scss'
import { GetServerSideProps, NextPage } from 'next'
import { Post } from 'src/entity/Post'
import Link from "next/link"
import { usePager } from 'hooks/usePager'
import LayoutDefault from 'components/layout/default'
import { getPaginationPost } from 'lib/getPaginationPost'

interface Props {
  browser: {
    name: string;
    version: string;
    major: string;
  },
  posts: Post[];
  count: number;
  page: number;
  total: number;
}

const Home: NextPage<Props> = (props) => {
  const { page, total, count } = props
  const pager = usePager({ page, total, count })
  return (
    <div>
      <h2>首页</h2>
      {props.posts.map((item) => (
        <div key={item.id}>
          <Link href={`/posts/${item.id}`}><a>{item.title}</a></Link>
        </div>
      ))}
      {pager}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = getPaginationPost

Home.getLayout = LayoutDefault

export default Home