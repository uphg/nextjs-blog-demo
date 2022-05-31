import { createContext } from 'react'
import { UserStore } from './user'

export const getBaseStore = () => ({
  user: new UserStore(),
})

export const storeContext = createContext(getBaseStore())