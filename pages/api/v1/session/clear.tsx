import { withSessionRoute } from "lib/withSession"
import { NextApiHandler } from "next"

const SessionClear: NextApiHandler = withSessionRoute(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.session.currentUser) {
    req.session.currentUser = null
    await req.session.save()
  }
  res.statusCode = 200
  res.end()
})

export default SessionClear