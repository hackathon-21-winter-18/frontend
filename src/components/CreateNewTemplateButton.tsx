import React from 'react'
import styles from './CreateNewTemplateButton.module.css'
import AddIcon from '@mui/icons-material/Add'

const CreateNewTemplateButton: React.VFC = () => {
  return (
    <button className={styles.createNewTemplateButton}>
      <AddIcon className={styles.addIcon} />
      テンプレートを作成する
    </button>
  )
}

export default CreateNewTemplateButton
