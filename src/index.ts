import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"
// import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {
    const posts = await AppDataSource.manager.find(Post) 
    console.log('posts')
    console.log(posts)
    const p = new Post()
    p.title = 'Post 1'
    p.content = '我的第一篇文章'
    await AppDataSource.manager.save(p)
    const posts2 = await AppDataSource.manager.find(Post)
    console.log('posts2')
    console.log(posts2)
    AppDataSource.close()
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
