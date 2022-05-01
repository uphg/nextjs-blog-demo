import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"

AppDataSource.initialize().then(async () => {
    const posts = await AppDataSource.manager.find(Post) 
    if (posts.length === 0) {
      await AppDataSource.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((p) => {
        return new Post({ title: `Post ${p}`, content: `我的第${p}篇文章` })
      })) 
    }
    const posts2 = await AppDataSource.manager.find(Post)
    console.log(posts2)
    AppDataSource.close()

}).catch(error => console.log(error))
