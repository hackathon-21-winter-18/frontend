import React from 'react'
import styles from './CreateNewPalaceButton.module.css'
import AddIcon from '@mui/icons-material/Add'

const CreateNewPalaceButton: React.VFC = () => {
  return (
    <button className={styles.createNewPalaceButton}>
      <AddIcon className={styles.addIcon} />
      宮殿を作成する
    </button>
  )
}

export default CreateNewPalaceButton
