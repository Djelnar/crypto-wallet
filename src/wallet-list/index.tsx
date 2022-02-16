import { styled } from '@mui/material/styles'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CreateWallet from './create-wallet'
import { useEffect, useState } from 'react'
import WalletView from './wallet-view'
import { Button } from '@mui/material'
import { useWeb3 } from 'hooks/use-web3'
import { Account } from 'web3-core'
import { WALLETS_KEY } from 'auth'

const DRAWER_WIDTH = 420

const SRoot = styled('div')(({ theme }) => ({
  height: '100vh',
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  marginLeft: `${DRAWER_WIDTH}px`,
  height: '100%',
}))

type Props = {
  password: string
}

const WalletList = ({ password }: Props) => {
  const [wallets, setWallets] = useState<Account[]>([])
  const web3 = useWeb3()

  useEffect(() => {
    const loaded = web3.eth.accounts.wallet
    setWallets(Array.from(loaded))
  }, [web3.eth.accounts.wallet])

  const addWallet = (privateKey: string) => {
    web3.eth.accounts.wallet.add(privateKey)
    web3.eth.accounts.wallet.save(password, WALLETS_KEY)
    const loaded = web3.eth.accounts.wallet
    setWallets(Array.from(loaded))
  }

  const [currentWallet, setCurrentWallet] = useState<Account | null>(null)
  const handleCloseCurrentWallet = () => {
    setCurrentWallet(null)
  }

  useEffect(() => {
    setCurrentWallet(wallets[wallets.length - 1] || null)
  }, [wallets])

  return (
    <SRoot>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <DrawerHeader>
          <Typography variant="h5">Wallets</Typography>
          {currentWallet && (
            <Button variant="contained" onClick={handleCloseCurrentWallet}>
              New Wallet
            </Button>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {wallets.map((wallet) => (
            <ListItem
              button
              onClick={() => setCurrentWallet(wallet)}
              key={wallet.address}
              selected={currentWallet?.address === wallet.address}
            >
              <ListItemText primary={wallet.address} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main>
        {currentWallet ? (
          <WalletView
            wallet={currentWallet}
            handleCloseCurrentWallet={handleCloseCurrentWallet}
          />
        ) : (
          <CreateWallet addWallet={addWallet} />
        )}
      </Main>
    </SRoot>
  )
}

export default WalletList
