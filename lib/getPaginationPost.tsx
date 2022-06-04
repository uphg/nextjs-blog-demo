import { Post } from "src/entity/Post"
import { getDataSource } from "./getDataSource"
import getQuery from "./getQuery"
import toJson from "./toJson"


export const getPaginationPost = async (context) => {
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

  return {
    props: {
      posts: toJson(posts),
      count,
      page,
      total: Math.ceil(count / perPage)
    }
  }
}