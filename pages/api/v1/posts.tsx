import { getDataSource } from "lib/getDataSource"
import { withSessionRoute } from "lib/withSession"
import { NextApiHandler } from "next"
import { Post } from "src/entity/Post"

const Posts: NextApiHandler = withSessionRoute(async (req, res) => {
  if (req.method === 'POST') {
    const { title, content } = req.body
    const post = new Post()
    post.title = title
    post.content = content
    const user = req.session.currentUser
    if (!user) {
      res.statusCode = 401
      res.end()
      return
    }
    post.author = user
    const myAppDataSource = await getDataSource()
    await myAppDataSource.manager.save(post)
    res.json(post)
  }
})

export default Posts
