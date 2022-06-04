import { Post } from "src/entity/Post";
import { getDataSource } from "lib/getDataSource"
import { NextApiHandler } from "next";
import { withSessionRoute } from "lib/withSession";



const PostItem: NextApiHandler = withSessionRoute(async (req, res) => {
  const { id } = req.query as { id: string }
  const user = req.session.currentUser;
  if (!user) {
    res.statusCode = 401
    res.end()
    return
  }
  if (req.method === 'PATCH') { 
    const { title, content } = req.body
    const appDataSource = await getDataSource()
    const post = await appDataSource.manager.findOne<Post>('Post', {
      where: { id }
    });
    post.title = title
    post.content = content
    await appDataSource.manager.save(post)
    res.json(post);
  } else if (req.method === 'DELETE') {
    const appDataSource = await getDataSource()
    const result = await appDataSource.manager.delete('Post', id)
    res.statusCode = result.affected >= 0 ? 200 : 400
    res.end()
  }  
})

export default PostItem