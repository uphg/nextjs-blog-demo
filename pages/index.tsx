import style from 'styles/home.module.scss'
import { GetServerSideProps, NextPage } from 'next'
import { UAParser } from 'ua-parser-js'
import { Post } from 'src/entity/Post'
import { getDataSource } from 'lib/getDataSource'
import Link from "next/link"
import { usePager } from 'hooks/usePager'
import getQuery from 'lib/getQuery'

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 获取分页
  const myDataSource = await getDataSource()
  const perPage = 5
  const url = context.req.url
  const query = getQuery(url)
  const page = parseInt(query.page?.toString()) || 1
  const [posts, count] = await myDataSource.manager.findAndCount(Post, {
    skip: (page - 1) * perPage,
    take: perPage
  })
  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()

  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      page,
      total: Math.ceil(count / perPage)
    }
  }
}

export default Home