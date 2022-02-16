import * as ethers from 'ethers'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Button, ButtonGroup } from '@mui/material'

const SRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr',
  height: '100%',
}))

const SPane = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
}))

type Props = {
  addWallet: (privateKey: string) => void
}

const CreateWallet = ({ addWallet }: Props) => {
  const [mnemonic, setMnemonic] = useState('')
  const [mnemonicError, setMnemonicError] = useState('')

  const handleChangeMnemonic: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMnemonic(e.target.value)
    setMnemonicError('')
  }

  const handleRandomMnemonic = async () => {
    const mnemonic = await ethers.utils.entropyToMnemonic(
      ethers.utils.randomBytes(16),
    )
    setMnemonic(mnemonic)
    setMnemonicError('')
  }

  const handleSubmitMnemonic: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    try {
      const preparedMnemonic = mnemonic.trim().split(/\s+/).join(' ')
      const wallet = ethers.Wallet.fromMnemonic(preparedMnemonic)
      addWallet(wallet.privateKey)
    } catch (error: any) {
      setMnemonicError(String(error))
    }
  }

  return (
    <SRoot>
      <SPane onSubmit={handleSubmitMnemonic}>
        <Typography>New ETH Wallet</Typography>
        <TextField
          value={mnemonic}
          onChange={handleChangeMnemonic}
          label="Mnemonic phrase (12 words)"
          color="secondary"
          fullWidth
          helperText={mnemonicError}
        />
        <ButtonGroup>
          <Button type="submit" variant="contained">
            Add
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleRandomMnemonic}
          >
            Random
          </Button>
        </ButtonGroup>
      </SPane>
    </SRoot>
  )
}

export default CreateWallet
