import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import {EditAddedWord} from '../components/EditAddedWord'
import PushPinIcon from '@mui/icons-material/PushPin'
import axios from 'axios'

interface EditProps {
  imageUrl?: string
}

export const Edit: React.VFC<EditProps> = ({imageUrl}) => {
  const [open, setOpen] = React.useState(false)

  const [newWord, setNewWord] = React.useState('')
  const [words, setWords] = React.useState(new Array<string>())
  const [newPlace, setNewPlace] = React.useState('')
  const [places, setPlaces] = React.useState(new Array<string>())
  const [newCondition, setNewCondition] = React.useState('')
  const [conditions, setConditions] = React.useState(new Array<string>())

  const [newCoodinate, setNewCoodinate] = React.useState<[number, number]>([0, 0])
  const [coodinates, setCoodinates] = React.useState(new Array<[number, number]>())
  const image = useParams() //あとで使うかも
  const location = useLocation()
  const [name, setName] = React.useState('')

  const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setNewCoodinate([e.pageX, e.pageY])
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setNewWord('')
    setNewPlace('')
    setNewCondition('')
  }
  const handleClick = () => {
    setWords([...words, newWord])
    setPlaces([...places, newPlace])
    setConditions([...conditions, newCondition])
    setCoodinates([...coodinates, newCoodinate])
    setOpen(false)
    setNewWord('')
    setNewPlace('')
    setNewCondition('')
  }
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _words = words.slice()
    _words[index] = e.target.value
    setWords([..._words])
  }
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _places = places.slice()
    _places[index] = e.target.value
    setPlaces([..._places])
  }
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _conditions = conditions.slice()
    _conditions[index] = e.target.value
    setConditions([..._conditions])
  }
  const handleDelete = (index: number) => {
    const _words = words.slice()
    _words.splice(index, 1)
    setWords([..._words])
    const _places = places.slice()
    _places.splice(index, 1)
    setPlaces([..._places])
    const _conditions = conditions.slice()
    _conditions.splice(index, 1)
    setConditions([..._conditions])
    const _coodinates = coodinates.slice()
    _coodinates.splice(index, 1)
    setCoodinates([..._coodinates])
  }
  function handleNameChange(e: any) {
    setName(e.target.value)
  }
  /*
  function handleComplete() {
    const embededPins = []
    for (let i = 0; i < embededPins.length; i++){
      embededPins.push({
        number: i,
        x:coodinates[i][0],
        y:coodinates[i][1],
        word: words[i],
        memo:""
      })
    }
    const data = {
      name: name,
      image: location.state.image,
      embededPins: embededPins,
      createdBy:userId,
    }
    axios.post("/palaces/me/" + userId, {}).then((res) => {
      //ダイアログ表示
    })
  }
  */
  /*{
  "name": "string",
  "image": "string",
  "embededPins": [
    {
      "number": 0,
      "x": 0,
      "y": 0,
      "word": "string",
      "memo": "string"
    }
  ],
  "createdBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}*/
  return (
    <div className={styles.edit}>
      {coodinates.map(([x, y]: [number, number], index) => (
        <PushPinIcon key={index} style={{position: 'absolute', top: y + 'px', left: x + 'px'}} />
      ))}
      <img className={styles.layoutImage} src={imageUrl ?? location.state.image} alt="map" onClick={handleOnClick} />
      <div>
        {[...Array(words.length)].map((_, index: number) => (
          <div>
            <EditAddedWord
              key={index}
              word={words[index]}
              place={places[index]}
              condition={conditions[index]}
              handleWordChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                handleWordChange(e, index)
              }
              handlePlaceChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                handlePlaceChange(e, index)
              }
              handleConditionChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                handleConditionChange(e, index)
              }
              handleDelete={() => handleDelete(index)}
            />
          </div>
        ))}
      </div>
      <AddNewWordDialog
        open={open}
        newWord={newWord}
        newPlace={newPlace}
        newCondition={newCondition}
        setNewWord={setNewWord}
        setNewPlace={setNewPlace}
        setNewCondition={setNewCondition}
        handleClose={handleClose}
        handleClick={handleClick}
      />
      {/*
			<input type="text" value={name} placeholder="神殿の名前" onChange={handleNameChange />}
			<button onClick={handleComplete}>完成！</button>
			*/}
    </div>
  )
}
