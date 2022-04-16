import path from 'path'
import fs, { promises as fsPromise } from 'fs'
import matter from 'gray-matter'

export const getPosts = async () => {
  const dir = path.join(process.cwd(), 'posts')
  const fileNames = await fsPromise.readdir(dir)
  const result: { date: string, title: string, id: string }[] = []
  fileNames.map((fileName, index) => {
    const fullPath = path.join(dir, fileName)
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