import React from 'react'
import {useMousePosition} from '../hooks/useMousePosition'
import styles from './CustomCursor.module.css'
import pin from '../assets/pin.svg'

type CursorType = 'default' | 'pin'
interface CustomCursorProps {
  type: CursorType
}

export const CustomCursor: React.VFC<CustomCursorProps> = ({type}) => {
  const {x, y} = useMousePosition()
  return (
    <>
      {type === 'pin' && (
        <div className={styles.pin} style={{left: `${x}px`, top: `${y}px`}}>
          <img src={pin} alt="" />
        </div>
      )}
    </>
  )
}
