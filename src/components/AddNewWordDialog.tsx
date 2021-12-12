import {Button, Card, Grow, IconButton} from '@mui/material'
import React, {useState} from 'react'
import styles from './AddNewWordDialog.module.css'
import pin from '../assets/pin.svg'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import {PinContent} from '../types'

interface AddNewWordDialogProps {
  open: boolean
  putPin: (pin: PinContent) => void
}

const AddNewWordDialog: React.VFC<AddNewWordDialogProps> = ({open, putPin}) => {
  const [word, setWord] = useState('')
  const [place, setPlace] = useState('')
  const [condition, setCondition] = useState('')

  const handlePutPin = () => {
    putPin({
      word,
      place,
      condition,
    })
  }

  return (
    <Grow in={open}>
      <Card elevation={1} className={styles.card}>
        <div className={styles.question}>
          <div>
            <img className={styles.pinIcon} src={pin} alt="" />
            <p>誰が何してる？</p>
          </div>
          <Button variant="outlined" className={styles.button} onClick={handlePutPin}>
            登録する
          </Button>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="パンダ🐼" onChange={(e) => setWord(e.target.value)} value={word} />
          が
          <input type="text" placeholder="リビング" onChange={(e) => setPlace(e.target.value)} value={place} />
          で
          <input
            type="text"
            placeholder="笹食ってる"
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
          />
          <IconButton color="warning">
            <ShuffleIcon />
          </IconButton>
        </div>
      </Card>
    </Grow>
  )
}

export default AddNewWordDialog
