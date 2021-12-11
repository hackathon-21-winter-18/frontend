import {Button, Card, Grow, IconButton} from '@mui/material'
import React from 'react'
import styles from './AddNewWordDialog.module.css'
import pin from '../assets/pin.svg'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import AddLocationIcon from '@mui/icons-material/AddLocation'

interface AddNewWordDialogProps {
  open: boolean
  // handleClose: () => void
  // handleClick: () => void
  // newWord: string
  // newPlace: string
  // newCondition: string
  // setNewWord: React.Dispatch<React.SetStateAction<string>>
  // setNewPlace: React.Dispatch<React.SetStateAction<string>>
  // setNewCondition: React.Dispatch<React.SetStateAction<string>>
}
export const AddNewWordDialog: React.VFC<AddNewWordDialogProps> = ({open}) => {
  // const {open, handleClose, handleClick, newWord, setNewWord, newPlace, setNewPlace, newCondition, setNewCondition} =
  //   props

  // const handleWordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setNewWord(e.target.value)
  // }
  // const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setNewPlace(e.target.value)
  // }
  // const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setNewCondition(e.target.value)
  // }

  return (
    <Grow in={open}>
      <Card elevation={1} className={styles.card}>
        <div className={styles.question}>
          <div>
            <img className={styles.pinIcon} src={pin} alt="" />
            <p>誰が何してる？</p>
          </div>
          <Button variant="outlined" className={styles.button}>
            登録する
          </Button>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="パンダ🐼" />
          が
          <input type="text" placeholder="リビング" />
          で
          <input type="text" placeholder="笹食ってる" />
          <IconButton color="warning">
            <ShuffleIcon />
          </IconButton>
        </div>
      </Card>
    </Grow>
  )
}
