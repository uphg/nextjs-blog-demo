// 客户端渲染
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios'
import Post from 'interface/post';

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get('/api/v1/posts').then((response: AxiosResponse<Post[]>) => {
      setPosts(response.data)
      setIsLoading(false)
      if (response.data.length === 0) {
        setIsEmpty(true)
      }
    }, () => {
      setIsLoading(true)
    })
  }, [])

  return {
    posts,
    isLoading,
    isEmpty
  }
}

const PostsIndex: NextPage = () => {
  const { isLoading, isEmpty, posts } = usePosts();

  return (
    <div>
      <h2>文章列表</h2>
      {isLoading ? <div>加载中</div> : 
        isEmpty ? <div>没有文章</div> :
          posts.map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  )
}

export default PostsIndex