import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { Comment } from "./entity/Comment"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

export const AppDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  logging: false,
  entities: [
    // 'dist/entity/**/*.js',
    User,
    Post,
    Comment,
  ],
  migrations: [
    'dist/migration/**/*.js'
  ],
  subscribers: [
    'dist/subscribers/**/*.js'
  ]
}

export const AppDataSource = new DataSource(AppDataSourceOptions)