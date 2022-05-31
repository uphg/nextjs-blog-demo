import { getDataSource } from "lib/getDataSource"
import { withSessionRoute } from "lib/withSession"
import { NextApiHandler } from "next"
import { User } from "src/entity/User"


const Userinfo: NextApiHandler = withSessionRoute(async (request, response) => {
  const user = request.session.currentUser || null
  const myDataSource = await getDataSource()
  const founds = await myDataSource.manager.find(User, {
    where: { username: user.username }
  })

  console.log('founds')
  console.log(founds)
  if (founds.length) {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.json({ username: founds[0].username })
  } else {
    response.statusCode = 401
  }
  response.end()
  
})

export default Userinfo
