import {useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import styles from 'Memorize.module.css'
import Word from '../components/Word'
import {PalaceType} from '../types'
import axios from 'axios'
import PushPinIcon from '@mui/icons-material/PushPin'
import Dialog from '@mui/material/Dialog'

const Memorize: React.VFC = () => {
  const [palace, setPalace] = useState<PalaceType>({
    id: '',
    name: '',
    image: '',
    embededPins: [{number: 0, x: 0, y: 0, word: '', place: '', do: ''}],
    share: false,
  })
  const [flags, setFlags] = useState([...Array(palace.embededPins.length)].fill(false))
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)
  let location = useLocation()

  const listItems = palace.embededPins.map((pin: any) => (
    <li key={pin.number}>
      <Word
        num={pin.number}
        word={pin.word}
        place={pin.place}
        condition={pin.do}
        flags={flags}
        handleClick={() => setFlags(flags.map((flag, i) => (i === pin.number ? !flag : flag)))}
      />
    </li>
  ))
  function Extension() {
    switch (palace.image.substring(0, 5)) {
      case 'iVBOR':
        return 'data:image/png;base64,' + palace.image
      case 'R0IGO':
        return 'data:image/gif;base64,' + palace.image
      case '/9j/4':
        return 'data:image/jpeg;base64,' + palace.image
    }
  }
  function handleClick() {
    setIsOpen(true)
  }
  useEffect(() => {
    if (location.state.shared) {
      axios.get('http://localhost:8080/api/palaces', {withCredentials: true}).then((res) => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === params.id) {
            setPalace(data[i])
          }
        }
      })
    } else {
      axios.get('http://localhost:8080/api/palaces/me', {withCredentials: true}).then((res) => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === params.id) {
            setPalace(data[i])
          }
        }
      })
    }
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
      <img src={Extension()} alt={palace.name} />
      {/*あとでコンポーネント分けるかも*/}
      <ol>{listItems}</ol>
      <br />
      {flags.every((value) => value) ? <button onClick={handleClick}>暗記完了!</button> : null}
      {/*flagの中身が全部trueなら表示*/}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        お疲れさまでした。
        <Link to="/">ホームへ戻る</Link>
      </Dialog>
    </div>
  )
}

export default Memorize
