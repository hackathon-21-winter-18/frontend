import * as React from 'react'
import {useParams, useLocation} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import {EditAddedWord} from '../components/EditAddedWord'
import PushPinIcon from '@mui/icons-material/PushPin'
import axios from 'axios'
import {UserContext} from '../components/UserProvider'
import {PalaceType} from '../types'

export const Fix: React.VFC = () => {
  const [open, setOpen] = React.useState(false)
  const [newWord, setNewWord] = React.useState('')
  const [newCoodinate, setNewCoodinate] = React.useState<[number, number]>([0, 0])
  const [words, setWords] = React.useState(new Array<string>())
  const [coodinates, setCoodinates] = React.useState(new Array<[number, number]>())
  const image = useParams() //あとで使うかも
  const location = useLocation()
  const [name, setName] = React.useState('')
  const {user} = React.useContext(UserContext)
  const [palace, setPalace] = React.useState<PalaceType>({
    id: '',
    name: '',
    image: '',
    embededPins: [{number: 0, x: 0, y: 0, word: '', place: '', do: ''}],
  })
  const params = useParams()

  const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setNewCoodinate([e.pageX, e.pageY])
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setNewWord('')
  }
  const handleClick = () => {
    setWords([...words, newWord])
    setCoodinates([...coodinates, newCoodinate])
    setOpen(false)
    setNewWord('')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _words = words.slice()
    _words[index] = e.target.value
    setWords([..._words])
  }
  const handleDelete = (index: number) => {
    const _words = words.slice()
    _words.splice(index, 1)
    setWords([..._words])
    const _coodinates = coodinates.slice()
    _coodinates.splice(index, 1)
    setCoodinates([..._coodinates])
  }

  function handleNameChange(e: any) {
    setName(e.target.value)
  }
  React.useEffect(() => {
    axios.get('http://localhost:8080/api/palaces/me/' + user.id, {withCredentials: true}).then((res) => {
      const data = res.data
      let words2 = words
      let coodinates2 = coodinates
      let name2 = name
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === params.id) {
          setPalace(data[i])
          for (let j = 0; j < data[i].embededPins.length; j++) {
            console.log([data[i].embededPins[j].word])
            console.log([[data[i].embededPins[j].x, data[i].embededPins[j].y]])
            console.log(data[i].name)
            words2 = words2.concat([data[i].embededPins[j].word])
            coodinates2 = coodinates2.concat([[data[i].embededPins[j].x, data[i].embededPins[j].y]])
            name2 = data[i].name
          }
        }
      }
      setWords(words2)
      setCoodinates(coodinates2)
      setName(name2)
      console.log('set!')
    })
  }, [])

  function handleComplete() {
    const embededPins = []
    for (let i = 0; i < coodinates.length; i++) {
      embededPins.push({
        number: i,
        x: coodinates[i][0],
        y: coodinates[i][1],
        word: words[i],
        place: 'test',
        do: 'test',
      })
    }
    const data = {
      name: name,
      image: location.state.image.substr(22),
      embededPins: embededPins,
    }
    console.log(data)
    axios
      .put('http://localhost:8080/api/palaces/' + palace.id, data, {withCredentials: true})
      .then((res) => {
        console.log(res.status)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleCheck() {
    console.log(words)
    console.log(coodinates)
    console.log(name)
  }

  return (
    <div>
      {coodinates.map(([x, y]: [number, number], index) => (
        <PushPinIcon key={index} style={{position: 'absolute', top: y + 'px', left: x + 'px'}} />
      ))}
      <div>
        <img src={location.state.image} alt="map" onClick={handleOnClick} />
      </div>
      <div>
        {words.map((word: string, index: number) => (
          <div>
            <EditAddedWord
              key={index}
              word={word}
              handleChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, index)}
              handleDelete={() => handleDelete(index)}
            />
          </div>
        ))}
      </div>
      <AddNewWordDialog
        open={open}
        newWord={newWord}
        setNewWord={setNewWord}
        handleClose={handleClose}
        handleClick={handleClick}
      />
      <input type="text" value={name} placeholder="神殿の名前" onChange={handleNameChange} />
      <button onClick={handleComplete}>完成!</button>
      <button onClick={handleCheck}>ボタン</button>
    </div>
  )
}
