import md5 from "md5";
import { getDataSource } from "lib/getDataSource";
import { User } from "src/entity/User";

export class SignIn {
  user: User;
  username: string;
  password: string;
  passwordDigest: string;
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[]
  };

  async validate() {
    const { errors, password } = this
    const username = this.username
    if (username === '') {
      errors.username.push('用户名不能为空')
    } else if (password === '') {
      errors.password.push('密码不能为空')
    } else {
      // 在数据库中查找该用户名
      const appDataSource = await getDataSource()
      const user = await appDataSource.manager.findOne(User, {
        where: { username: username }
      })
      if (user) {
        this.user = user
        if (user.passwordDigest !== md5(password)) {
          errors.password.push('密码与用户名不匹配')
        }
      } else {
        errors.username.push('用户名不存在')
      }
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(e => e.length > 0)
  }
}