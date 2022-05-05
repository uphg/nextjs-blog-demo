import { AppDataSource } from "src/data-source"

const promise = (async function () {
  if (AppDataSource.isInitialized) {
    return AppDataSource
  } else {
    return AppDataSource.initialize()
  }
})();

export const getDataSource = async () => {
  return promise
}