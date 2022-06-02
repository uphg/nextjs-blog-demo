import style from 'styles/posts.module.scss'
import { usePager } from "hooks/usePager"
import Link from "next/link"
import { Post } from "src/entity/Post";

export interface PostsProps {
  posts: Post[];
  count: number;
  page: number;
  total: number;
}

export const usePosts = (props: PostsProps) =>  {
  const { page, total, count } = props
  const pager = usePager({ page, total, count })
  return (
    <div className={style.posts}>
      {props.posts.map((item) => (
        <Link key={item.id} href={`/posts/${item.id}`}>
          <a className={style['post-item']}>
            <div>{item.title}</div>
          </a>
        </Link>
      ))}
      {pager}
    </div>
  )
}
