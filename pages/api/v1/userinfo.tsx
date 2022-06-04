// import { getDataSource } from "lib/getDataSource"
import { withSessionRoute } from "lib/withSession"
import { NextApiHandler } from "next"
import _ from 'lodash'
// import { User } from "src/entity/User"


const Userinfo: NextApiHandler = withSessionRoute(async (req, res) => {
  const user = req.session.currentUser || null
  // const appDataSource = await getDataSource()
  // const founds = await appDataSource.manager.find(User, {
  //   where: { username: user.username }
  // })
  if (user) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(_.omit(user, ['createdAt', 'updatedAt']))
  } else {
    res.statusCode = 401
  }
  res.end()
})

export default Userinfo
