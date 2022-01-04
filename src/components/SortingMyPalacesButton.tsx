import * as React from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'
import styles from './Sorting.module.css'
import {FormControlLabel, Input, Radio, RadioGroup} from '@mui/material'
import {PalaceType} from '../types'
import {config} from '../config'

interface SortingMyPalacesButtonProp {
  setPalaces: React.Dispatch<React.SetStateAction<PalaceType[]>>
}
export const SortingMyPalacesButton = (prop: SortingMyPalacesButtonProp) => {
  const {setPalaces} = prop
  const [order, setOrder] = React.useState('updated_at')
  const [minPins, setMinPins] = React.useState(0)
  const [maxPins, setMaxPins] = React.useState(1)
  const [warning, setWarning] = React.useState(false)
  const handleMinPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (Number(e.target.value) >= 0) {
      setMinPins(Number(e.target.value))
    } else {
      setMinPins(0)
    }
  }
  const handleMaxPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (Number(e.target.value) > 0) {
      setMaxPins(Number(e.target.value))
    } else {
      setMaxPins(1)
    }
  }

  const handleClick = () => {
    if (maxPins >= minPins && minPins >= 0 && maxPins > 0) {
      axios
        .get(config() + `/api/palaces/me?sort=${order}&maxpins=${maxPins}&minpins=${minPins}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.length !== 0) {
            setPalaces(res.data)
          }
        })
        .catch((err) => console.log(err))
      setWarning(false)
    } else {
      setWarning(true)
    }
  }
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrder(e.target.value)
  }
  return (
    <div className={styles.sorting}>
      <RadioGroup
        aria-label="sort"
        defaultValue="updated_at"
        value={order}
        name="radio-buttons-group"
        onChange={handleOrderChange}>
        <FormControlLabel label="更新日時が新しい順" control={<Radio />} value="updated_at" />
        <FormControlLabel label="更新日時が古い順" control={<Radio />} value="-updated_at" />
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
