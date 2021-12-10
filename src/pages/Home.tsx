import {useEffect, useState} from 'react'
import styles from './Home.module.css'
import Palace from '../components/Palace'
import {PalaceType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import CreateNewPalaceButton from '../components/CreateNewPalaceButton'
import {useContext} from 'react'
import {UserContext} from '../components/UserProvider'

const mockPalaces: PalaceType[] = [
  {
    id: '0',
    name: 'Versailles',
    image: palace1,
    embededPins: [
      {number: 0, x: 0, y: 0, word: 'apple', place: 'aaa', do: 'aaa'},
      {number: 1, x: 1, y: 1, word: 'banana', place: 'bbb', do: 'bbb'},
    ],
  },
  {
    id: '1',
    name: 'Buckingham',
    image: palace2,
    embededPins: [
      {number: 0, x: 0, y: 0, word: 'apple', place: 'aaa', do: 'aaa'},
      {number: 1, x: 1, y: 1, word: 'banana', place: 'bbb', do: 'bbb'},
    ],
  },
]
const Home: React.VFC = () => {
  const [palaces, setPalaces] = useState([
    {
      id: '',
      name: '',
      image: '',
      embededPins: [{number: 0, x: 0, y: 0, word: '', place: '', do: ''}],
    },
  ])
  const {user} = useContext(UserContext)

  useEffect(() => {
    axios.get('http://localhost:8080/api/oauth/whoamI', {withCredentials: true}).then((res) => {
      console.log(res.data)
      console.log(res.data.id, res.data.name)
    })
    console.log('b')
    axios
      .get('http://localhost:8080/api/palaces/me/' + user.id, {withCredentials: true})
      .then((res) => {
        setPalaces(res.data)
        console.log(res.data)
        console.log('a')
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={styles.home}>
      <Sidebar />
      <ul className={styles.palaceContainer}>
        <CreateNewPalaceButton />

        {palaces.map((palace) => (
          <Palace key={palace.id} palace={palace} />
        ))}
      </ul>
    </div>
  )
}

export default Home
