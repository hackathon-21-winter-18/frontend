import * as React from 'react'
import {useParams, useLocation} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import {EditAddedWord} from '../components/EditAddedWord'
import PushPinIcon from '@mui/icons-material/PushPin'
import axios from 'axios'
import {UserContext} from '../components/UserProvider'
import {TemplateType} from '../types'
import Dialog from '@mui/material/Dialog'

export const EditFromTemplate: React.VFC = () => {
  const [open, setOpen] = React.useState(false)
  const [newWord, setNewWord] = React.useState('')
  const [words, setWords] = React.useState(new Array<string>())
  const [newPlace, setNewPlace] = React.useState('')
  const [places, setPlaces] = React.useState(new Array<string>())
  const [newCondition, setNewCondition] = React.useState('')
  const [conditions, setConditions] = React.useState(new Array<string>())
  const [newCoodinate, setNewCoodinate] = React.useState<[number, number]>([0, 0])
  const [coodinates, setCoodinates] = React.useState(new Array<[number, number]>())
  const params = useParams() //あとで使うかも
  const location = useLocation()
  const [name, setName] = React.useState('')
  const {user} = React.useContext(UserContext)
  const [template, setTemplate] = React.useState<TemplateType>({
    id: '',
    name: '',
    image: '',
    pins: [{number: 0, x: 0, y: 0}],
  })
  const [isOpen, setIsOpen] = React.useState(false)

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
    setCoodinates([...coodinates, newCoodinate])
    setOpen(false)
    setNewWord('')
    setNewPlace('')
    setNewCondition('')
    setPlaces([...places, newPlace])
    setConditions([...conditions, newCondition])
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

  function handleComplete() {
    if (coodinates.length > 0 && name !== '') {
      const embededPins = []
      for (let i = 0; i < coodinates.length; i++) {
        embededPins.push({
          number: i,
          x: coodinates[i][0],
          y: coodinates[i][1],
          word: words[i],
          place: places[i],
          do: conditions[i],
        })
      }
      const data = {
        name: name,
        image: template.image.substring(22),
        embededPins: embededPins,
        createdBy: user.id,
      }
      console.log(data)
      axios
        .post('http://localhost:8080/api/palaces/me', data, {withCredentials: true})
        .then((res) => {
          console.log(res.status)
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setIsOpen(true)
    }
  }
  React.useEffect(() => {
    axios.get('http://localhost:8080/api/templates/me', {withCredentials: true}).then((res) => {
      const data = res.data
      let name2 = name
      let coodinates2 = coodinates
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === params.id) {
          setTemplate(data[i])
          for (let j = 0; j < data[i].pins.length; j++) {
            name2 = data[i].name
            coodinates2 = coodinates2.concat([[data[i].pins[j].x, data[i].pins[j].y]])
          }
        }
      }
      setName(name2)
      setCoodinates(coodinates2)
      const array = Array(coodinates.length)
      array.fill('')
      setWords(array)
      setPlaces(array)
      setConditions(array)
      console.log('set!')
    })
  }, [])

  return (
    <div>
      {coodinates.map(([x, y]: [number, number], index) => (
        <PushPinIcon key={index} style={{position: 'absolute', top: y + 'px', left: x + 'px'}} />
      ))}
      <div>
        <img src={location.state.image} alt="map" onClick={handleOnClick} />
      </div>
      <div>
        {[...Array(words.length)].map((_, index: number) => (
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
      <input type="text" value={name} placeholder="宮殿の名前" onChange={handleNameChange} />
      <button onClick={handleComplete}>完成!</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <span>単語もしくは宮殿の名前が登録されていません。</span>
        <button onClick={() => setIsOpen(false)}>OK</button>
      </Dialog>
    </div>
  )
}
