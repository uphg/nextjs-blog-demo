"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = exports.AppDataSourceOptions = void 0;

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Comment = require("./entity/Comment");

var _Post = require("./entity/Post");

var _User = require("./entity/User");

var AppDataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  logging: false,
  entities: [// 'dist/entity/**/*.js',
  _User.User, _Post.Post, _Comment.Comment],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscribers/**/*.js']
};
exports.AppDataSourceOptions = AppDataSourceOptions;
var AppDataSource = new _typeorm.DataSource(AppDataSourceOptions);
exports.AppDataSource = AppDataSource;