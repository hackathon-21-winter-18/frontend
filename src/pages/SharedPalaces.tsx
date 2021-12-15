import {useEffect, useState} from 'react'
import styles from './SharedPalaces.module.css'
import SharedPalace from '../components/SharedPalace'
import axios from 'axios'
import {useContext} from 'react'
import {UserContext} from '../components/UserProvider'
import {SharedPalaceType} from '../types'

const SharedPalaces: React.VFC = () => {
  const [palaces, setPalaces] = useState(new Array<SharedPalaceType>())

  const {user} = useContext(UserContext)
  const listItems = palaces.map((palace, index) => (
    <li key={palace.id}>
      <SharedPalace palace={palace} />
    </li>
  ))

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/palaces', {withCredentials: true})
      .then((res) => {
        if (res.data) {
          setPalaces(res.data)
          console.log(res.data)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={styles.sharedPalaces}>
      <h1>Shared Palaces</h1>
      <div className={styles.divider} />
      <ul className={styles.palaceContainer}>{listItems}</ul>
    </div>
  )
}

export default SharedPalaces
