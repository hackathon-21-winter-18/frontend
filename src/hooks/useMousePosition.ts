import {useEffect, useState} from 'react'

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const {offsetX, clientY} = event
      setMousePosition({x: offsetX, y: clientY})
    }
    document.addEventListener('mousemove', mouseMoveHandler)

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return mousePosition
}
