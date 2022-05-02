
## 启动数据库

运行一个容器

```sh
# 运行一个容器
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

# 创建数据库
CREATE DATABASE xxx ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 删除之前的数据库

```sh
# 在 psql 中运行
drop database blog_development;
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
