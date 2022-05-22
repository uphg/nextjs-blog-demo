import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { Comment } from "./entity/Comment"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

export const AppDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.NODE_ENV === 'production' ? 'localhost' : "psql1",
  port: 5432,
  username: "blog",
  password: "",
  database: process.env.NODE_ENV === 'production' ? "blog_production" : "blog_development",
  synchronize: false,
  logging: false,
  entities: [
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