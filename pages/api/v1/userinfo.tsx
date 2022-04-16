import { NextApiHandler } from "next"


const Userinfo: NextApiHandler = (request, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify({ name: 'Jack' }))
  response.end()
}

export default Userinfo