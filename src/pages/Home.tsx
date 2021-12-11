import {useEffect, useState} from 'react'
import styles from './Home.module.css'
import Palace from '../components/Palace'
import {PalaceType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import CreateNewPalaceButton from '../components/CreateNewPalaceButton'

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
  const [palaces, setPalaces] = useState(null)

  /*
	useEffect(() => {
		axios.get("/palaces/me/"+userId).then((res) => setPalaces(res.data))
	}, []) @
*/
  return (
    <div className={styles.home}>
      <h1>My Palace</h1>
      <div className={styles.divider} />
      <ul className={styles.palaceContainer}>
        <CreateNewPalaceButton />

        {/* mockPalaces→palaces @ */}
        {mockPalaces.map((palace) => (
          <Palace key={palace.id} palace={palace} />
        ))}
      </ul>
    </div>
  )
}

export default Home
