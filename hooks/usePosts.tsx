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
    <>
      <div className='post-list'>
        {props.posts.map((item) => (
          <Link key={item.id} href={`/post/${item.id}`}>
            <a className='post-item'>
              <div>{item.title}</div>
            </a>
          </Link>
        ))}
        {pager}
      </div>
      <style jsx>{`
      .post-item {
        display: block;
        padding: 12px 16px;
        background-color: #fff;
        border-bottom: 1px solid #e5e6eb;
      }
      .post-item:first-child {
        border-top: 1px solid #e5e6eb;
      }
    `}</style>
    </>
  )
}
