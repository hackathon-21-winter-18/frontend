import React from 'react'
import styles from './CreateNewTemplateButton.module.css'
import img from '../assets/createPalace.png'
import gif from '../assets/createPalace.gif'
import NewCreationDialog from './NewCreationDialog'
import Dialog from '@mui/material/Dialog'

const CreateNewTemplateButton: React.VFC = () => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <button className={styles.createNewTemplateButton} onClick={handleClickOpen}>
        <img src={gif} alt="" className={styles.gif} />
        <img src={img} alt="" className={styles.img} />
        テンプレートを作成する
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth={false}>
        <NewCreationDialog modeProp="createTemplate" />
      </Dialog>
    </>
  )
}

export default CreateNewTemplateButton
