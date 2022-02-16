import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Web3Provider } from 'hooks/use-web3'
import Web3 from 'web3'
import Auth from 'auth'
import './index.css'

const rpcURL = process.env.REACT_APP_RPC_URL!

export const web3 = new Web3(rpcURL)

const Root = () => {
  return (
    <Web3Provider value={web3}>
      <CssBaseline />
      <Auth />
    </Web3Provider>
  )
}

export default Root
