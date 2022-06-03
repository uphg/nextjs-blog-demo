// import { getDataSource } from "lib/getDataSource"
import { withSessionRoute } from "lib/withSession"
import { NextApiHandler } from "next"
import _ from 'lodash'
// import { User } from "src/entity/User"


const Userinfo: NextApiHandler = withSessionRoute(async (request, response) => {
  const user = request.session.currentUser || null
  // const myDataSource = await getDataSource()
  // const founds = await myDataSource.manager.find(User, {
  //   where: { username: user.username }
  // })
  if (user) {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.json(_.omit(user, ['createdAt', 'updatedAt']))
  } else {
    response.statusCode = 401
  }
  response.end()
  
})

export default Userinfo
