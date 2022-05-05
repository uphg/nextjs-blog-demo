import { NextApiHandler } from "next"
import { SignIn } from "src/model/SignIn"

const Sessions: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  const { username, password } = req.body
  const signIn = new SignIn()
  signIn.username = username
  signIn.password = password
  await signIn.validate()
  if (signIn.hasErrors()) {
    res.statusCode = 422
    res.write(JSON.stringify(signIn.errors))
  } else {
    res.statusCode = 200
    res.write(JSON.stringify(signIn.user))
  }

  res.end()
}

export default Sessions
