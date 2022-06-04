import { getDataSource } from "lib/getDataSource"
import { withSessionRoute } from "lib/withSession"
import { NextApiHandler } from "next"
import { Post } from "src/entity/Post"

const PostNew: NextApiHandler = withSessionRoute(async (req, res) => {
  if (req.method === 'POST') {
    const user = req.session.currentUser
    if (!user) {
      res.statusCode = 401
      res.end()
      return
    }
    const { title, content } = req.body
    const post = new Post()
    post.title = title
    post.content = content
    post.author = user
    post.authorName = user.username
    const appDataSource = await getDataSource()
    await appDataSource.manager.save(post)
    res.json(post)
  }
})

export default PostNew
