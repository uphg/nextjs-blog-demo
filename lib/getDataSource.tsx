import { AppDataSource } from "src/data-source"

const promise = (async function () {
  // if (AppDataSource.isInitialized) {
  //   console.log('需要关闭')
  //   await AppDataSource.destroy()
  // }
  return AppDataSource.initialize()
})();

export const getDataSource = async () => {
  return promise
}