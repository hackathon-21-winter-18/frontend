import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router'
import styles from 'Memorize.module.css'
import Word from '../components/Word'
import {PalaceType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import PushPinIcon from '@mui/icons-material/PushPin'
import {UserContext} from '../components/UserProvider'

const mockPalaces: PalaceType[] = [
  {
    id: '0',
    name: 'Versailles',
    image: palace1,
    embededPins: [
      {number: 0, x: 100, y: 100, word: 'apple', place: 'aaa', do: 'aaa'},
      {number: 1, x: 200, y: 200, word: 'banana', place: 'bbb', do: 'bbb'},
    ],
  },
  {
    id: '1',
    name: 'Buckingham',
    image: palace2,
    embededPins: [
      {number: 0, x: 100, y: 100, word: 'apple', place: 'aaa', do: 'aaa'},
      {number: 1, x: 200, y: 200, word: 'banana', place: 'bbb', do: 'bbb'},
    ],
  },
]

const Memorize: React.VFC = () => {
  const [flags, setFlags] = useState([...Array(2)].fill(false)) //2→palace.embededPins.length @
  const [palace, setPalace] = useState<PalaceType>({
    id: '',
    name: '',
    image: '',
    embededPins: [{number: 0, x: 0, y: 0, word: '', place: '', do: ''}],
  })
  const params = useParams()
  const {user} = useContext(UserContext)

  const listItems = palace.embededPins.map((pin: any) => (
    <li key={pin.number}>
      <Word
        num={pin.number}
        word={pin.word}
        flags={flags}
        handleClick={() => setFlags(flags.map((flag, i) => (i === pin.number ? !flag : flag)))}
      />
    </li>
  ))
  function handleClick() {
    alert('ダイアログ表示')
  }
  useEffect(() => {
    axios.get('http://localhost:8080/api/palaces/me', {withCredentials: true}).then((res) => {
      const data = res.data
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === params.id) {
          setPalace(data[i])
        }
      }
    })
  }, [])
  return (
    <div>
      <span>暗記画面</span>
      <br />
      {palace.embededPins.map((pin) => (
        <PushPinIcon
          key={pin.number}
          style={{
            position: 'absolute',
            top: pin.y + 'px',
            left: pin.x + 'px',
            color: flags[pin.number] ? 'blue' : 'red',
          }}
        />
      ))}
      <img src={'data:image/png;base64,' + palace.image} alt={palace.name} />
      {/*あとでコンポーネント分けるかも*/}
      <ol>{listItems}</ol>
      <br />
      {flags.every((value) => value) ? <button onClick={handleClick}>暗記完了！</button> : null}
      {/*flagの中身が全部trueなら表示*/}
    </div>
  )
}

export default Memorize
