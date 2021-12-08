import {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import styles from 'Memorize.module.css'
import Word from '../components/Word'
import {PalaceType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import PushPinIcon from '@mui/icons-material/PushPin'

const mockPalaces: PalaceType[] = [
  {
    id: '0',
    name: 'Versailles',
    image: palace1,
    embededPins: [
      {number: 0, x: 100, y: 100, word: 'apple', memo: 'aaa'},
      {number: 1, x: 200, y: 200, word: 'banana', memo: 'bbb'},
    ],
  },
  {
    id: '1',
    name: 'Buckingham',
    image: palace2,
    embededPins: [
      {number: 0, x: 100, y: 100, word: 'apple', memo: 'aaa'},
      {number: 1, x: 200, y: 200, word: 'banana', memo: 'bbb'},
    ],
  },
]

const Memorize: React.VFC = () => {
  const [flags, setFlags] = useState([...Array(2)].fill(false)) //2→palace.embededPins.length @
  const [palace, setPalace] = useState(null)
  const params = useParams()

  //mockPalaces[]→palace @
  const listItems = mockPalaces[Number(params.id)].embededPins.map((pin: any) => (
    <li>
      <Word
        key={pin.number}
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
  /*
	paramsに一致する宮殿を取得
	useEffect(() => {
		axios.get("/palaces/me/"+userId).then((res) => {
			const data = res.data
			for (let i = 0; i < data.length; i++) {
				if (data.id === params.id) {
					setPalace(data[i])
				}
			}
		})
	}, []) @
*/
  return (
    <div>
      <span>暗記画面</span>
      <br />
      {/* mockPalaces[]→palce @*/}
      {mockPalaces[Number(params.id)].embededPins.map((pin, index) => (
        <PushPinIcon
          style={{
            position: 'absolute',
            top: pin.y + 'px',
            left: pin.x + 'px',
            color: flags[pin.number] ? 'blue' : 'red',
          }}
          key={pin.number}
        />
      ))}
      {/*mockPalaces[]→palce @*/}
      <img src={mockPalaces[Number(params.id)].image} alt={mockPalaces[Number(params.id)].name} />
      {/*あとでコンポーネント分けるかも*/}
      <ol>{listItems}</ol>
      <br />
      {flags.every((value) => value) ? <button onClick={handleClick}>暗記完了！</button> : null}
      {/*flagの中身が全部trueなら表示*/}
    </div>
  )
}

export default Memorize
