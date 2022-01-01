import {Button, Card, Grow, IconButton} from '@mui/material'
import React, {useState} from 'react'
import styles from './AddNewWordDialog.module.css'
import pin from '../assets/pin.svg'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import DeleteIcon from '@mui/icons-material/Delete'
import {PinContent, EmbededPins} from '../types'

interface AddNewWordDialogProps {
  open: boolean
  setOpen?: (open: boolean) => void
  putPin: (pin: PinContent) => void
  deletePin?: (pin: EmbededPins) => void
  pinContent?: EmbededPins
  pins?: EmbededPins[]
  setPins?: (pins: EmbededPins[]) => void
}

const AddNewWordDialog: React.VFC<AddNewWordDialogProps> = ({
  open,
  setOpen,
  putPin,
  deletePin,
  pinContent,
  pins,
  setPins,
}) => {
  const [word, setWord] = useState(() => {
    if (pinContent) {
      return pinContent.word
    } else {
      return ''
    }
  })
  const [place, setPlace] = useState(() => {
    if (pinContent) {
      return pinContent.place
    } else {
      return ''
    }
  })
  const [situation, setSituation] = useState(() => {
    if (pinContent) {
      return pinContent.situation
    } else {
      return ''
    }
  })

  const handlePutPin = () => {
    if (pins) {
      const updatedPin = {
        number: pinContent!.number,
        x: pinContent!.x,
        y: pinContent!.y,
        word: word,
        place: place,
        situation: situation,
      }
      const newPins = pins
        .slice(0, pinContent!.number)
        .concat([updatedPin])
        .concat(pins.slice(pinContent!.number + 1))
      setPins!(newPins)
    } else {
      putPin({
        word,
        place,
        situation,
      })
    }
  }

  return (
    <Grow in={open}>
      <Card elevation={1} className={styles.card}>
        <div className={styles.question}>
          <div>
            <img className={styles.pinIcon} src={pin} alt="" />
            <p>誰が何してる？</p>
          </div>
          {deletePin ? (
            <IconButton onClick={() => deletePin!(pinContent!)} className={styles.trashButton}>
              <DeleteIcon />
            </IconButton>
          ) : null}
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
            onChange={(e) => setSituation(e.target.value)}
            value={situation}
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
