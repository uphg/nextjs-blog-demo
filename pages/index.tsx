import "reflect-metadata"
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Post } from 'src/entity/Post'
import { UAParser } from 'ua-parser-js'
import { getDataSource } from 'lib/getDataSource'
import Link from "next/link"

interface Props {
  browser: {
    name: string;
    version: string;
    major: string;
  },
  posts: Post[]
}

const Home: NextPage<Props> = (props) => {

  return (
    <div>
      <h2>文章列表</h2>
      {props.posts.map((item) => <div key={item.id}>
        <Link href={`/posts/${item.id}`}><a>{item.title}</a></Link>
      </div>)}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const myDataSource = await getDataSource()
  const posts = await myDataSource.manager.find(Post)

  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()

  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

export default Home