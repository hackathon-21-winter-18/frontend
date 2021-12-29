import {useEffect, useState} from 'react'
import styles from './SharedPalaces.module.css'
import SharedPalace from '../components/SharedPalace'
import axios from 'axios'
import {SharedPalaceType} from '../types'
import {config} from '../config'
import {useLocation, Link} from 'react-router-dom'

const SharedPalaces: React.VFC = () => {
  const [palaces, setPalaces] = useState(new Array<SharedPalaceType>())
  const {pathname} = useLocation()

  const listItems = palaces.map((palace, index) => (
    <li key={palace.id}>
      <SharedPalace num={index} palace={palace} deletePalace={DeletePalace} />
    </li>
  ))

  function DeletePalace(number: number) {
    setPalaces(palaces.slice(0, number).concat(palaces.slice(number + 1)))
  }

  useEffect(() => {
    axios
      .get(config() + '/api/palaces', {withCredentials: true})
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
      <Link to="/sharedPalaces" className={pathname === '/sharedPalaces' ? styles.buttonHere : styles.buttonNotHere}>
        Shared Palaces
      </Link>
      <Link
        to="/sharedTemplates"
        className={pathname === '/sharedTemplates' ? styles.buttonHere : styles.buttonNotHere}>
        Shared Templates
      </Link>
      <ul className={styles.palaceContainer}>{listItems}</ul>
    </div>
  )
}

export default SharedPalaces
