import { Post } from "src/entity/Post";
import { getDataSource } from "lib/getDataSource"
import { NextApiHandler } from "next";
import { withSessionRoute } from "lib/withSession";



const Posts: NextApiHandler = withSessionRoute(async (req, res) => {
  const { id } = req.query as { id: string }
  console.log('id')
  console.log(id)
  if (req.method === 'PATCH') {
    const { title, content } = req.body
    const myAppDataSource = await getDataSource()
    const post = await myAppDataSource.manager.findOne<Post>('Post', {
      where: { id }
    });
    post.title = title
    post.content = content

    const user = req.session.currentUser;
    console.log('user')
    console.log(user)
    // res.json(post);
  }
  
  res.end(`Post: ${id}`)
})

export default Posts