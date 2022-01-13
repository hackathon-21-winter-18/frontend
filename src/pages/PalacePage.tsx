import {useEffect, useState} from 'react'
import styles from './PalacePage.module.css'
import Palace from '../components/Palace'
import {PalaceType} from '../types'
import CreateNewPalaceButton from '../components/CreateNewPalaceButton'
import {getPalace} from '../api/palace'
import {SortingMyPalacesButton} from '../components/SortingMyPalacesButton'

const PalacePage: React.VFC = () => {
  const [palaces, setPalaces] = useState(new Array<PalaceType>())
  const listItems = palaces.map((palace, index) => (
    <li key={palace.id}>
      <Palace num={index} palace={palace} handleDeletePalace={DeletePalace} />
    </li>
  ))

  function DeletePalace(number: number) {
    setPalaces(palaces.slice(0, number).concat(palaces.slice(number + 1)))
  }
  useEffect(() => {
    getPalace((res) => {
      if (res.data) {
        setPalaces(res.data)
      }
    })
  }, [])

  return (
    <div className={styles.home}>
      <h1>My Palaces</h1>
      <div className={styles.divider} />
      <ul className={styles.palaceContainer}>
        <CreateNewPalaceButton />
        <SortingMyPalacesButton setPalaces={setPalaces} />
        {listItems}
      </ul>
    </div>
  )
}

export default PalacePage
