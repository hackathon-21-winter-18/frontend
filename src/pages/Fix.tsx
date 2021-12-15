import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import useAuth from '../components/UserProvider'
import {PalaceType} from '../types'
import Dialog from '@mui/material/Dialog'
import {Link} from 'react-router-dom'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import {getPalace, postPalace, putPalace} from '../api/palace'

export const Fix: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const params = useParams()
  const location = useLocation()
  const [palaceName, setPalaceName] = React.useState('')
  const {user} = useAuth()
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)

  React.useEffect(() => {
    const palaceID = params.id
    palaceID &&
      getPalace().then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === palaceID) {
            setPalaceName(data[i].name)
            setPins(data[i].embededPins)
          }
        }
      })
  }, [])

  const handleComplete = (e: any) => {
    e.preventDefault()
    if (pins.length > 0) {
      let willSendImage = ''
      if (location.state.image.substr(0, 23) === 'data:image/jpeg;base64,') {
        willSendImage = location.state.image.substring(23)
      } else {
        willSendImage = location.state.image.substring(22)
      }
      const data = {
        name: palaceName,
        image: willSendImage,
        embededPins: pins,
      }
      console.log(data)
      params.id && putPalace(params.id, data)
      setCompleteIsOpen(true)
    }
  }

  const handleClickAway = () => {
    setOpen(false)
  }
  const boxStyle = React.useCallback<() => SxProps>(
    () => ({
      position: 'fixed',
      top: y,
      left: x,
      transform: `translate(${window.innerWidth / 2 < x ? '-100%' : '0'}, -100%)`,
      p: 1,
      borderRadius: 2,
      transitionDuration: '0.2s',
    }),
    [open, pinOpen]
  )

  const pinStyle = React.useCallback<() => React.CSSProperties>(
    () => ({
      position: 'fixed',
      top: y,
      left: x,
      transform: `translate(-50%, -100%)`,
    }),
    [open]
  )

  const putPin = React.useCallback(
    (pin: PinContent) => {
      const data = {
        word: pin.word,
        place: pin.place,
        do: pin.condition,
        number: pins.length,
        x: (x - hoverRef.current.x) / hoverRef.current.width,
        y: (y - hoverRef.current.y) / hoverRef.current.height,
      }
      setPins([...pins, data])
      setOpen(false)
    },
    [open]
  )
  const handlePinClick = React.useCallback((pin: EmbededPins) => {
    setPinOpen(pin)
  }, [])
  const handleDeletePin = React.useCallback(
    (pin: EmbededPins) => {
      setPins(pins.filter((tmp) => tmp !== pin))
      setPinOpen(null)
    },
    [pins]
  )

  return (
    <div className={styles.edit}>
      <CustomCursor type="pin" isHover={isHovered} />
      <ClickAwayListener onClickAway={() => setPinOpen(null)}>
        <div>
          {pins.map((pin, i) => (
            <img
              className={styles.pushedPin}
              key={i}
              src={pinIcon}
              alt=""
              style={{
                position: 'absolute',
                top: pin.y * hoverRef.current.height + 'px',
                left: pin.x * hoverRef.current.width + 'px',
                transform: `translate(-50%, -100%)`,
              }}
              onClick={() => {
                handlePinClick(pin)
              }}
            />
          ))}
          {pinOpen && (
            <Portal>
              <Box sx={boxStyle()}>
                <FixWordDialog open={pinOpen} deletePin={handleDeletePin} />
              </Box>
            </Portal>
          )}
        </div>
      </ClickAwayListener>

      <IconButton className={styles.togglPinList}>
        <Badge badgeContent={pins.length} color="primary">
          <img src={pinIcon} alt="" className={styles.pinIcon} />
        </Badge>
      </IconButton>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <img
            className={styles.layoutImage}
            src={location.state.image}
            alt="mapImage"
            onClick={() => setOpen(Math.random())}
            ref={hoverRef}
          />
          {open && (
            <Portal>
              <Box sx={boxStyle()}>
                <AddNewWordDialog open={!!open} putPin={putPin} />
              </Box>
              <img src={pinIcon} alt="" className={styles.pinIcon} style={pinStyle()} />
            </Portal>
          )}
        </div>
      </ClickAwayListener>

      <form>
        <input
          required
          type="text"
          value={palaceName}
          placeholder="宮殿の名前"
          onChange={(e) => setPalaceName(e.target.value)}
        />
        <button onClick={handleComplete} type="submit" disabled={pins.length <= 0 || palaceName === ''}>
          完成!
        </button>
      </form>
      <Dialog open={completeIsOpen}>
        宮殿が修正されました
        <Link to={'/memorize/' + params.id}>今すぐ覚える</Link>
        <Link to="/">ホームへ戻る</Link>
      </Dialog>
    </div>
  )
}
