import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import _ from 'lodash'
import md5 from "md5";
import { AppDataSource } from "../data-source";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
    id: string;
  @Column('varchar')
    username: string;
  @Column('varchar')
    passwordDigest: string;
  @CreateDateColumn()
    createdAt: Date;
  @UpdateDateColumn()
    updatedAt: Date;
  @OneToMany('Post', 'author')
    posts: Post[];
  @OneToMany('Comment', 'user')
    comments: Comment[];
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[]
  };
  password: string;
  passwordConfirmation: string;

  async validate() {
    const { errors, password, passwordConfirmation } = this
    const username = this.username.trim()
    if (username === '') {
      errors.username.push('用户名不能为空')
    } else if (!/[a-zA-Z0-9]/.test(username)) {
      errors.username.push('用户名格式不合法')
    } else if (username.length > 42 || username.length < 3) {
      if (username.length > 42) {
        errors.username.push('用户名过长')
      } else if (username.length < 3) {
        errors.username.push('用户名过短')
      }
    }

    // 在数据库中查找该用户名，判断是否重复
    const founds = await AppDataSource.manager.find(User, {
      where: { username: username }
    })
    if (founds.length > 0) {
      errors.username.push('该用户名已存在，不能重复注册！')
    }
    if (password === '') {
      errors.password.push('密码不能为空')
    }
    if (password !== passwordConfirmation) {
      errors.passwordConfirmation.push('两次输入密码不一致')
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(e => e.length > 0)
  }

  // 密码加密
  @BeforeInsert() // 在每次数据库写入数据时执行
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password) 
  }

  // 处理 JSON 方法返回的数据
  toJSON() {
    return _.omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'errors'])
  }
}
