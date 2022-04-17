import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDir = path.join(process.cwd(), 'markdown')

export const getPosts = async () => {
  const fileNames = await fs.promises.readdir(postsDir)
  const result: { date: string, title: string, id: string }[] = []
  fileNames.map((fileName, index) => {
    const fullPath = path.join(postsDir, fileName)
    const id = fileName.replace(/\.md$/g, '')
    const text = fs.readFileSync(fullPath, 'utf-8')
    const { data: { title, date }, content } = matter(text)
    result[index] = {
      date,
      title,
      id
    }
  })
  return result
}

export const getPostIds = async () => {
  const fileNames = await fs.promises.readdir(postsDir)
  return fileNames.map((item) => item.replace(/\.md$/g, ''))
}

export const getPost = async (id: string) => {
  const fullPath = path.join(postsDir, `${id}.md`)
  const text = fs.readFileSync(fullPath, 'utf-8')
  const { data: { title, date }, content } = matter(text)

  const htmlContent = marked(content) 
  return JSON.parse(JSON.stringify({
    title,
    date,
    content,
    htmlContent
  }))
}