import { GetServerSideProps, NextPage } from 'next'
import { UAParser } from 'ua-parser-js'
import qs from 'query-string'
import { Post } from 'src/entity/Post'
import { getDataSource } from 'lib/getDataSource'
import Link from "next/link"
import { usePager } from 'hooks/usePager'

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

const PostsIndex: NextPage<Props> = (props) => {
  const { page, total, count } = props
  const pager = usePager({ page, total, count })
  return (
    <div>
      <h2>文章列表</h2>
      {props.posts.map((item) => <div key={item.id}>
        <Link href={`/posts/${item.id}`}><a>{item.title}</a></Link>
      </div>)}
      {pager}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const posts = await myDataSource.manager.find(Post)
  
  // 获取分页
  const myDataSource = await getDataSource()
  const perPage = 2
  const url = context.req.url
  const index = url.indexOf('?')
  const search = url.substring(index + 1)
  const query = qs.parse(search)
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

export default PostsIndex