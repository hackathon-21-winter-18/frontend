import {useEffect, useState} from 'react'
import styles from './Home.module.css'
import Palace from '../components/Palace'
import {PalaceType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import CreateNewPalaceButton from '../components/CreateNewPalaceButton'
import useAuth from '../components/UserProvider'

const Home: React.VFC = () => {
  const [palaces, setPalaces] = useState(new Array<PalaceType>())

  const listItems = palaces.map((palace, index) => (
    <li key={palace.id}>
      <Palace num={index} palace={palace} deletePalace={DeletePalace} />
    </li>
  ))
  const {user} = useAuth()

  function DeletePalace(number: number) {
    setPalaces(palaces.slice(0, number).concat(palaces.slice(number + 1)))
  }
  useEffect(() => {
    axios.get('http://localhost:8080/api/oauth/whoamI', {withCredentials: true}).then((res) => {
      console.log(res.data)
    })
    axios
      .get('http://localhost:8080/api/palaces/me', {withCredentials: true})
      .then((res) => {
        if (res.data) {
          setPalaces(res.data)
          console.log(res.data)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={styles.home}>
      <h1>My Palace</h1>
      <div className={styles.divider} />
      <ul className={styles.palaceContainer}>
        <CreateNewPalaceButton />

        {listItems}
      </ul>
    </div>
  )
}

export default Home
