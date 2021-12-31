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
  const [situation, setSituation] = useState('')
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
      putPin({
        word,
        place,
        situation,
      })
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
