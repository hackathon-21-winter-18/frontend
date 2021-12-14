import {Card, Grow, IconButton} from '@mui/material'
import React from 'react'
import styles from './FixWordDialog.module.css'
import pin from '../assets/pin.svg'
import {EmbededPins} from '../types'
import DeleteIcon from '@mui/icons-material/Delete'
import HidableWord from './HidableWord'

interface FixWordDialogProps {
  isVisible?: boolean
  open: EmbededPins
  deletePin: (pin: EmbededPins) => void
}
export const FixWordDialog: React.VFC<FixWordDialogProps> = ({open, deletePin, isVisible = true}) => {
  return (
    <Grow in={!!open}>
      <Card elevation={1} className={styles.card}>
        <div className={styles.inputContainer}>
          <HidableWord text={open.word} isVisible={isVisible} />
          が
          <HidableWord text={open.place} isVisible={isVisible} />
          で
          <HidableWord text={open.do} isVisible={isVisible} />
          {isVisible && (
            <IconButton onClick={() => deletePin(open)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </Card>
    </Grow>
  )
}
