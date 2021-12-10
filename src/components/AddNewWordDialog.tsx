import { Button, Dialog, Input } from '@mui/material'
import * as React from 'react'

interface AddNewWordDialogProps {
  open: boolean
  handleClose: () => void
  handleClick: () => void
  newWord: string
  newPlace: string
  newCondition: string
  setNewWord: React.Dispatch<React.SetStateAction<string>>
  setNewPlace: React.Dispatch<React.SetStateAction<string>>
  setNewCondition: React.Dispatch<React.SetStateAction<string>>
}
export default function AddNewWordDialog(props: AddNewWordDialogProps) {
  const { open, handleClose, handleClick, newWord, setNewWord, newPlace, setNewPlace, newCondition, setNewCondition } = props
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewWord(e.target.value)
  }
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPlace(e.target.value)
  }
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCondition(e.target.value)
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <div>追加する</div>
      <div>
        <Input value={newWord} onChange={handleWordChange} />
        <span>が</span>
        <Input value={newPlace} onChange={handlePlaceChange} />
        <span>で</span>
        <Input value={newCondition} onChange={handleConditionChange} />
      </div>
      <Button onClick={handleClick}>登録</Button>
    </Dialog>
  )
}
