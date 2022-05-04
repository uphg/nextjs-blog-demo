import { getDataSource } from "lib/getDataSource"
import { NextApiHandler } from "next"
import { User } from "src/entity/User"

const Users: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  const { username, password, passwordConfirmation } = req.body
  const user = new User()
  user.username = username.trim()
  user.password = password
  user.passwordConfirmation = passwordConfirmation

  const myDataSource = await getDataSource()
  await user.validate()
  if (user.hasErrors()) {
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  } else {
    await myDataSource.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }

  res.end()
}

export default Users
