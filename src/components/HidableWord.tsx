import React, {useState} from 'react'
import styles from './HidableWord.module.css'

interface HidableWordProps {
  text: string
  isVisible: boolean
}
const HidableWord: React.VFC<HidableWordProps> = ({text, isVisible}) => {
  const [open, setOpen] = useState(false)
  return isVisible ? (
    <span className={styles.visible}>{text}</span>
  ) : (
    <span className={open ? styles.notHide : styles.hide} onClick={() => setOpen(!open)}>
      {text}
    </span>
  )
}

export default HidableWord
