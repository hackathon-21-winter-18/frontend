import * as React from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'
import styles from './Sorting.module.css'
import {FormControlLabel, Input, Radio, RadioGroup} from '@mui/material'
import {SharedPalaceType} from '../types'
import {config} from '../config'

interface SortingPublicPalacesButtonProp {
  setPalaces: React.Dispatch<React.SetStateAction<SharedPalaceType[]>>
}
export const SortingPublicPalacesButton = (prop: SortingPublicPalacesButtonProp) => {
  const {setPalaces} = prop
  const [order, setOrder] = React.useState('first_shared_at')
  const [minPins, setMinPins] = React.useState(0)
  const [maxPins, setMaxPins] = React.useState(10000)
  const [warning, setWarning] = React.useState(false)
  const handleMinPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMinPins(Number(e.target.value))
  }
  const handleMaxPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMaxPins(Number(e.target.value))
  }

  const handleClick = () => {
    if (maxPins >= minPins && minPins >= 0 && maxPins > 0) {
      axios
        .get(config() + `/api/palaces?sort=${order}&maxpins=${maxPins}&minpins=${minPins}`, {withCredentials: true})
        .then((res) => {
          if (res.data.length !== 0) {
            setPalaces(res.data)
          }
        })
        .catch((err) => console.log(err))
    } else {
      setWarning(true)
    }
  }
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrder(e.target.value)
  }
  return (
    <div>
      <RadioGroup
        aria-label="sort"
        defaultValue="first_shared_at"
        value={order}
        name="radio-buttons-group"
        onChange={handleOrderChange}>
        <FormControlLabel label="最初の公開日時が新しい順" control={<Radio />} value="first_shared_at" />
        <FormControlLabel label="公開日時が新しい順" control={<Radio />} value="shared_at" />
        <FormControlLabel label="保存したユーザーが多い順" control={<Radio />} value="savedCount" />
      </RadioGroup>
      <span>ピンの数: </span>
      <Input type="number" value={minPins} onChange={handleMinPinsChange} className={styles.pinNumberInput}></Input>
      <span>～</span>
      <Input type="number" value={maxPins} onChange={handleMaxPinsChange} className={styles.pinNumberInput}></Input>
      <span className={styles.warning}>{warning ? 'ピンの数指定が不正です' : null}</span>
      <div className={styles.sortingButton}>
        <Button onClick={handleClick}>並び替える</Button>
      </div>
    </div>
  )
}
