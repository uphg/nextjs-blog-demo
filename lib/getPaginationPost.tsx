import { Post } from "src/entity/Post"
import { getDataSource } from "./getDataSource"
import getQuery from "./getQuery"

export const getPaginationPost = async (context) => {
  // 获取分页
  const appDataSource = await getDataSource()
  const perPage = 5
  const url = context.req.url
  const query = getQuery(url)
  const page = parseInt(query.page?.toString()) || 1
  const [posts, count] = await appDataSource.manager.findAndCount(Post, {
    skip: (page - 1) * perPage,
    take: perPage
  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts || null)),
      count,
      page,
      total: Math.ceil(count / perPage)
    }
  }
}