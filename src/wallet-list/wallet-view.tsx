import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useWeb3 } from 'hooks/use-web3'
import { Account } from 'web3-core'
import { CircularProgress, Typography } from '@mui/material'
import { useEthBusd } from 'hooks/use-eth-busd'

const sleep = (delay: number) =>
  new Promise((res) => setTimeout(res, delay, delay))

const SRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  height: '100%',
}))

const { format: formatUSD } = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  maximumFractionDigits: 2,
})
const { format: formatETH } = new Intl.NumberFormat('en-US', {
  currency: 'ETH',
  style: 'currency',
  maximumFractionDigits: 4,
})

type Props = {
  wallet: Account
  handleCloseCurrentWallet: () => void
}

const WalletView = ({ handleCloseCurrentWallet, wallet }: Props) => {
  const web3 = useWeb3()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState('0')
  const busdValue = useEthBusd(+balance)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      web3.eth.getBalance(wallet.address).then((wei) => {
        setBalance(web3.utils.fromWei(wei, 'ether'))
      }),
      sleep(250),
    ]).finally(() => {
      setLoading(false)
    })

    const subscription = web3.eth.subscribe(
      'newBlockHeaders',
      (error, blockHeader) => {
        if (error) {
          console.log(`Watch error: ${error}`)
        } else {
          web3.eth.getBalance(wallet.address).then((wei) => {
            setBalance(web3.utils.fromWei(wei, 'ether'))
          })
        }
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [wallet.address, web3])

  if (loading) {
    return (
      <SRoot>
        <CircularProgress />
      </SRoot>
    )
  }

  return (
    <SRoot>
      <code>{wallet.address}</code>
      <Typography variant="h2">{formatETH(+balance)}</Typography>
      <Typography variant="h3">{formatUSD(busdValue)}</Typography>
    </SRoot>
  )
}

export default WalletView
