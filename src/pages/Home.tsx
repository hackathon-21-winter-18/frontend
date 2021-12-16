import {useEffect, useState} from 'react'
import styles from './Home.module.css'
import Palace from '../components/Palace'
import {PalaceType} from '../types'
import axios from 'axios'
import CreateNewPalaceButton from '../components/CreateNewPalaceButton'
import {config} from '../config'

const Home: React.VFC = () => {
  const [palaces, setPalaces] = useState(new Array<PalaceType>())
  const listItems = palaces.map((palace, index) => (
    <li key={palace.id}>
      <Palace num={index} palace={palace} deletePalace={DeletePalace} />
    </li>
  ))

  function DeletePalace(number: number) {
    setPalaces(palaces.slice(0, number).concat(palaces.slice(number + 1)))
  }
  useEffect(() => {
    axios
      .get(config() + '/api/palaces/me', {withCredentials: true})
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
      <h1>My Palaces</h1>
      <div className={styles.divider} />
      <ul className={styles.palaceContainer}>
        <CreateNewPalaceButton />

        {listItems}
      </ul>
    </div>
  )
}

export default Home
