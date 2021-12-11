import {Card, Grow, IconButton} from '@mui/material'
import React from 'react'
import styles from './AddNewWordDialog.module.css'
import pin from '../assets/pin.svg'
import {EmbededPins} from '../types'
import DeleteIcon from '@mui/icons-material/Delete'

interface FixWordDialogProps {
  open: EmbededPins
  deletePin: (pin: EmbededPins) => void
}
export const FixWordDialog: React.VFC<FixWordDialogProps> = ({open, deletePin}) => {
  return (
    <Grow in={!!open}>
      <Card elevation={1} className={styles.card}>
        <div className={styles.inputContainer}>
          <input type="text" disabled value={open.word} />
          が
          <input type="text" disabled value={open.place} />
          で
          <input type="text" disabled value={open.do} />
          <IconButton onClick={() => deletePin(open)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
    </Grow>
  )
}
