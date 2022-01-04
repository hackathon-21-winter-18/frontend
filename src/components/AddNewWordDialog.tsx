import {Button, Card, Grow, IconButton} from '@mui/material'
import React, {useState} from 'react'
import styles from './AddNewWordDialog.module.css'
import pin from '../assets/pin.svg'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import DeleteIcon from '@mui/icons-material/Delete'
import {PinContent, EmbededPin} from '../types'

interface AddNewWordDialogProps {
  open: boolean
  setOpen?: (open: boolean) => void
  putPin: (pin: PinContent) => void
  deletePin?: (pin: EmbededPin) => void
  pinContent?: EmbededPin
  pins?: EmbededPin[]
  setPins?: (pins: EmbededPin[]) => void
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
  const [warning, setWarning] = useState(false)
  //const [randomSituation, setRandomSituation] = useState<string[]>(new Array<string>())
  const [randomSituation, setRandomSituation] = useState<string[]>([
    '踊ってる',
    '食べてる',
    '歌ってる',
    '寝てる',
    '遊んでる',
    'こっち見てる',
  ])

  const handlePutPin = () => {
    if (word !== '' && place !== '' && situation !== '') {
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
    } else {
      setWarning(true)
    }
  }
  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }

  const handleShuffle = () => {
    setSituation(randomSituation[getRandomIntInclusive(0, randomSituation.length - 1)])
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
          <input
            type="text"
            placeholder={warning ? '単語が未設定' : 'パンダ🐼'}
            onChange={(e) => setWord(e.target.value)}
            value={word}
            className={warning ? styles.warning : styles.safe}
          />
          が
          <input
            type="text"
            placeholder={warning ? '場所が未設定' : 'リビング'}
            onChange={(e) => setPlace(e.target.value)}
            value={place}
            className={warning ? styles.warning : styles.safe}
          />
          で
          <input
            type="text"
            placeholder={warning ? '状況が未設定' : '笹食ってる'}
            onChange={(e) => setSituation(e.target.value)}
            value={situation}
            className={warning ? styles.warning : styles.safe}
          />
          <IconButton color="warning" onClick={handleShuffle}>
            <ShuffleIcon />
          </IconButton>
        </div>
      </Card>
    </Grow>
  )
}

export default AddNewWordDialog
