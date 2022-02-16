import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, TextField, Typography } from '@mui/material'
import { useWeb3 } from 'hooks/use-web3'
import { WALLETS_KEY } from 'auth'

const SRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  height: '100%',
}))

type Props = {
  handleUnlock: (password: string) => void
}

const Login = ({ handleUnlock }: Props) => {
  const web3 = useWeb3()

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
    setError('')
  }

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setError('')
    try {
      web3.eth.accounts.wallet.load(password, WALLETS_KEY)
      handleUnlock(password)
      setPassword('')
    } catch (error) {
      setError(String(error))
    }
  }
  return (
    <SRoot onSubmit={handleLogin}>
      <Typography variant="h5">Login</Typography>
      <TextField
        value={password}
        onChange={handleChangePassword}
        label="Password"
        type="password"
        helperText={error}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </SRoot>
  )
}

export default Login
