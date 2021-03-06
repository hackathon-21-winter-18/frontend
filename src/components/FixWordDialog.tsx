import {Card, Grow, IconButton} from '@mui/material'
import React from 'react'
import styles from './FixWordDialog.module.css'
import pin from '../assets/pin.svg'
import {EmbededPin} from '../types'
import DeleteIcon from '@mui/icons-material/Delete'
import HidableWord from './HidableWord'

interface FixWordDialogProps {
  isPlayground?: boolean
  isVisible?: boolean
  open: EmbededPin
  deletePin: (pin: EmbededPin) => void
  flags?: boolean[]
  setFlags?: (flags: boolean[]) => void
}
export const FixWordDialog: React.VFC<FixWordDialogProps> = ({
  isPlayground = false,
  open,
  deletePin,
  isVisible = true,
  flags = [false],
  setFlags,
}) => {
  function handleComplete() {
    if (setFlags) {
      flags[open.number] = !flags[open.number]
      setFlags(flags)
    }
  }
  return (
    <Grow in={!!open}>
      <Card elevation={1} className={styles.card}>
        <div className={styles.inputContainer}>
          <HidableWord text={open.word} isVisible={isVisible || !open.word || flags[open.number]} />
          が
          <HidableWord text={open.place} isVisible={isVisible || !open.place || flags[open.number]} />
          で
          <HidableWord text={open.situation} isVisible={isVisible || !open.situation || flags[open.number]} />
          {isVisible && (
            <IconButton onClick={() => deletePin(open)}>
              <DeleteIcon />
            </IconButton>
          )}
          <div>
            {!isPlayground && (
              <IconButton onClick={flags && handleComplete} color={flags && flags[open.number] ? 'primary' : 'error'}>
                完了
              </IconButton>
            )}
          </div>
        </div>
      </Card>
    </Grow>
  )
}
