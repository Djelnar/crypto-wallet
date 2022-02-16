import { useEffect, useState } from 'react'
import Login from './login'
import Register from './register'
import WalletList from 'wallet-list'

export const WALLETS_KEY = 'kek-wallets-lol'

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false)
  const [password, setPassword] = useState('')
  const handleUnlock = (password: string) => {
    setPassword(password)
  }

  useEffect(() => {
    const wallets = localStorage.getItem(WALLETS_KEY)
    if (wallets) {
      setHasAccount(true)
    }
  }, [])

  if (password) {
    return <WalletList password={password} />
  }

  return (
    <>
      {hasAccount ? (
        <Login handleUnlock={handleUnlock} />
      ) : (
        <Register handleUnlock={handleUnlock} />
      )}
    </>
  )
}

export default Auth
