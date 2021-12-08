import {useEffect, useState, useContext} from 'react'
import styles from './Home.module.css'
import Header from '../components/Header'
import Palace from '../components/Palace'
import {PalaceType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import {UserContext} from '../components/UserProvider'

const mockPalaces: PalaceType[] = [
  {
    id: '0',
    name: 'Versailles',
    image: palace1,
    embededPins: [
      {number: 0, x: 0, y: 0, word: 'apple', memo: 'aaa'},
      {number: 1, x: 1, y: 1, word: 'banana', memo: 'bbb'},
    ],
  },
  {
    id: '1',
    name: 'Buckingham',
    image: palace2,
    embededPins: [
      {number: 0, x: 0, y: 0, word: 'apple', memo: 'aaa'},
      {number: 1, x: 1, y: 1, word: 'banana', memo: 'bbb'},
    ],
  },
]
const Home: React.VFC = () => {
  const [palaces, setPalaces] = useState([
    {
      id: '',
      name: '',
      image: '',
      embededPins: [{number: 0, x: 0, y: 0, word: '', memo: ''}],
    },
  ])
  const {user} = useContext(UserContext)
  const listItems = palaces.map((palace) => (
    <li>
      <Palace key={palace.id} palace={palace} />
    </li>
  ))
  useEffect(() => {
    axios.get('http://localhost:8080/palaces/me/' + user.id).then((res) => setPalaces(res.data))
  }, [])

  return (
    <div className={styles.Home}>
      <Header />
      <span>ホーム画面</span>
      <ul>{listItems}</ul>
    </div>
  )
}

export default Home
