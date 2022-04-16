import { GetStaticProps, NextPage } from 'next';
import { getPosts } from 'lib/posts';

// SSG静态页渲染
type Post = {
  id: string;
  title: string;
  date: string;
}

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  return (
    <div>
      <h2>文章列表</h2>
      {props.posts.map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

export default PostsIndex