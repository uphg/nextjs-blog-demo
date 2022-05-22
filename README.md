## Next.js & TypeORM 博客项目实战

## 启动数据库

运行一个 docker 容器

```sh
# 在 Docker 中创建一个网络（服务器可不做）
docker network create network1

# 本地运行
docker run --net=network1 --name=psql1 -v "/$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

# 服务器上运行
docker run -v /home/blog/blog-data/:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

## 清空之前的开发环境

```sh
docker ps
docker kill 容器id
docker rm 容器id

# windows 运行
docker volume ls # 查看当前运行的 volume
docker container prune # 关闭未使用的容器
docker volume rm blog-data # 清除指定 volume

# mac/linux 运行
rm -rf blog-data
```

## 创建数据库

```sh
# 进入指定容器
docker exec -it <id> bash

# 进入 blog 用户
psql -U blog

# 创建 blog_development 数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

# 进入 blog_development 数据库
\c blog_development
```

## 创建数据表

```sh
rm -rf dist
yarn m:run
yarn seed
```

## run

```bash
yarn build
docker build . -t jack/node-web-app

# 本地运行
docker run --name=node1 --network=network1 -p 3000:3000 -dit jack/node-web-app
# 服务器上运行
docker run --name=node1 --network=host -p 3000:3000 -dit jack/node-web-app

docker logs node1
```