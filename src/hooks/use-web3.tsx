import { createContext, useContext } from 'react'
import Web3 from 'web3'

const Web3Context = createContext<Web3 | null>(null)

export const Web3Provider = Web3Context.Provider

export const useWeb3 = () => {
  const web3 = useContext(Web3Context)

  return web3!
}
