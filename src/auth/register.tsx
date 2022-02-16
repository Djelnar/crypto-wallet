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

const Register = ({ handleUnlock }: Props) => {
  const web3 = useWeb3()

  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError('')
    setPassword(e.target.value)
  }
  const handleChangePasswordAgain: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setError('')
    setPasswordAgain(e.target.value)
  }
  const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setError('')
    if (password === passwordAgain) {
      try {
        web3.eth.accounts.wallet.create(0)
        web3.eth.accounts.wallet.save(password, WALLETS_KEY)
        handleUnlock(password)
        setPassword('')
        setPasswordAgain('')
      } catch (error) {
        setError(String(error))
      }
    } else {
      setError("Passwords don't match")
    }
  }

  return (
    <SRoot onSubmit={handleRegister}>
      <Typography variant="h5">Register</Typography>
      <TextField
        value={password}
        onChange={handleChangePassword}
        label="Password"
        type="password"
      />
      <TextField
        value={passwordAgain}
        onChange={handleChangePasswordAgain}
        label="Confirm Password"
        type="password"
        helperText={error}
      />
      <Button type="submit" variant="contained">
        Create Account
      </Button>
    </SRoot>
  )
}

export default Register
