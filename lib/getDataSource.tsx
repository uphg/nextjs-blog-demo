import "reflect-metadata"
import { AppDataSource } from "src/data-source"

const create = () => {
  console.log('create 执行了')
  return AppDataSource.initialize()
}
const promise = (async function () {
  
  // if (AppDataSource.isInitialized) {
  //   console.log('需要关闭')
  //   await AppDataSource.destroy()
  // }
  return create()
})();

export const getDataSource = async () => {
  return promise
}