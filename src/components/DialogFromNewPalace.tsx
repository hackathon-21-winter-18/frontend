import * as React from 'react'
import styles from './DialogFromNewPalace.module.css'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import NewCreationDialog from './NewCreationDialog'
import AddBoxIcon from '@mui/icons-material/AddBox'

export default function FromNewPalace() {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <span>
      <Button className={styles.button} onClick={handleClickOpen} variant="contained" startIcon={<AddBoxIcon />}>
        新規画像から
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={false}>
        <NewCreationDialog modeProp="general" />
      </Dialog>
    </span>
  )
}
