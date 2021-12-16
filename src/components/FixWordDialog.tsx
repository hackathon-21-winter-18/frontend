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
  flags?: boolean[]
  setFlags?: (flags: boolean[]) => void
}
export const FixWordDialog: React.VFC<FixWordDialogProps> = ({open, deletePin, isVisible = true, flags, setFlags}) => {
  function handleComplete() {
    flags![open.number] = !flags![open.number]
    setFlags!(flags!)
  }
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
          <div>
            {!isVisible && (
              <IconButton onClick={flags && handleComplete} color={flags && flags![open.number] ? 'error' : 'primary'}>
                完了
              </IconButton>
            )}
          </div>
        </div>
      </Card>
    </Grow>
  )
}
