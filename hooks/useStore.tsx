import { useContext } from 'react'
import { storeContext } from 'store/index'

export const useStore = () => useContext(storeContext)