import * as React from 'react'
import Button from '@mui/material/Button'
import axios from 'axios';
import { FormControlLabel, Input, Radio, RadioGroup } from '@mui/material';
import { PalaceType } from '../types';
interface SortingMyTemplatesButtonProp {
  setTemplates: React.Dispatch<React.SetStateAction<PalaceType[]>>
}
export const SortingMyTemplatesButton = (props: SortingMyTemplatesButtonProp) => {
  const { setTemplates } = props;
  const [order, setOrder] = React.useState('first_shared_at');
  const [minPins, setMinPins] = React.useState(0);
  const [maxPins, setMaxPins] = React.useState(10000);
  const handleMinPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMinPins(Number(e.target.value))
  }
  const handleMaxPinsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMaxPins(Number(e.target.value))
  }

  const handleClick = () => {
    axios
      .get(`http://localhost:8080/api/templates/me?sort=${order}&maxpins=${maxPins}&minpins=${minPins}`, { withCredentials: true })
      .then((res) => {
        if (res.data.length !== 0) {
          setTemplates(res.data)
          console.log(res.data)
        }
      })
      .catch((error) => console.log(error))

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
        onChange={handleOrderChange}
      >
        <FormControlLabel label="更新日時が新しい順" control={<Radio />} value="updated_at" />
        <FormControlLabel label="更新日時が古い順" control={<Radio />} value="-updated_at" />
      </RadioGroup>
      <div>min</div>
      <Input type="number" value={minPins} onChange={handleMinPinsChange} ></Input>
      <div>max</div>
      <Input type="number" value={maxPins} onChange={handleMaxPinsChange}></Input>
      <Button onClick={handleClick}>SORT</Button>
    </div>
  )
}