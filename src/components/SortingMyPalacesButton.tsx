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
  const [maxPins, setMaxPins] = React.useState(10000)
  const handleMinPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMinPins(Number(e.target.value))
  }
  const handleMaxPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMaxPins(Number(e.target.value))
  }

  const handleClick = () => {
    axios
      .get(config() + `/api/palaces/me?sort=${order}&maxpins=${maxPins}&minpins=${minPins}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length !== 0) {
          setPalaces(res.data)
          console.log(res.data)
        }
      })
      .catch((error) => console.log(error))
  }
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrder(e.target.value)
  }
  return (
    <div className={styles.sorting}>
      <RadioGroup
        aria-label="sort"
        defaultValue="first_shared_at"
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
      <div className={styles.sortingButton}>
        <Button onClick={handleClick}>並び替える</Button>
      </div>
    </div>
  )
}
