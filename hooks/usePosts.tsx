import axios from "axios";
import { usePager } from "hooks/usePager"
import Link from "next/link"
import { useCallback } from "react";
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

  const onRemove = (id) => {
    axios.delete(`/api/v1/post/${id}`).then((response) => {
      console.log('response')
      console.log(response)
      window.alert('删除成功')
    })
  }
  return (
    <>
      <div className='post-list'>
        {props.posts.map((item) => (
          <div className='post-item' key={item.id}>
            <div className="title">
              <Link href={`/post/${item.id}`}>
                <a className="title-link">{item.title}</a>
              </Link>
            </div>
            <div className="abstract">{item.content.slice(0, 200)}</div>
            <div className="meta">
              <span className="user-info">{item.authorName + ' - ' + item.authorId}</span>
              <span className="options">
                <Link href={`/editor/${item.id}`}>
                  <a className="option-button">编辑</a>
                </Link>
                <button className="option-button" onClick={() => onRemove(item.id)}>删除</button>
              </span>
            </div>
          </div>
        ))}
        {pager}
      </div>
      <style jsx>{`
      .post-item {
        display: block;
        color: #86909c;
        padding: 12px 16px;
        background-color: #fff;
        border-bottom: 1px solid #e5e6eb;
      }
      .post-item:first-child {
        border-top: 1px solid #e5e6eb;
      }
      .title {
        font-size: 16px;
        font-weight: 700;
        color: #1d2129;
        margin-bottom: 8px;
      }
      .title-link {
        border-bottom: 2px solid transparent;
      }
      .title-link:hover {
        color: #0070f3;
        border-bottom-color: #0070f3;
      }
      .abstract {
        font-size: 14px;
        margin-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .meta {
        display: flex;
        justify-content: space-between;
      }
      .option-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #1d2129;
        font-size: 14px;
        padding: 0;
        border-bottom: 1px solid transparent;
      }
      .option-button:not(:last-child) {
        margin-right: 6px;
      }
      .option-button:hover {
        color: #0070f3;
        border-bottom-color: #0070f3;
      }
    `}</style>
    </>
  )
}
