import React from 'react'
import styles from './CreateNewPalaceButton.module.css'
import img from '../assets/createPalace.png'
import gif from '../assets/createPalace.gif'

const CreateNewPalaceButton: React.VFC = () => {
  return (
    <button className={styles.createNewPalaceButton}>
      <img src={gif} alt="" className={styles.gif} />
      <img src={img} alt="" className={styles.img} />
      宮殿を作成する
    </button>
  )
}

export default CreateNewPalaceButton
