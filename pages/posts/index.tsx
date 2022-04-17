import { GetStaticProps, NextPage } from 'next';
import { getPosts } from 'lib/posts';
import Link from 'next/link';
import Post from 'interface/post';

// SSG静态页渲染
type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  return (
    <div>
      <h2>文章列表</h2>
      {props.posts.map((item) => <div key={item.id}>
        <Link href={`/posts/${item.id}`}><a>{item.title}</a></Link>
      </div>)}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

export default PostsIndex