import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation, useNavigate} from 'react-router'
import {AddNewWordDialog} from '../components/AddNewWordDialog'
import useAuth from '../components/UserProvider'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import {postPalace} from '../api/palace'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

type Mode = 'edit' | 'memorization'

interface EditProps {
  imageUrl?: string
  isPlayground?: boolean
}

export const Edit: React.VFC<EditProps> = ({imageUrl, isPlayground = false}) => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const [mode, setMode] = React.useState<Mode>('edit')
  const image = useParams() //あとで使うかも
  const location = useLocation()
  const [palaceName, setPalaceName] = React.useState('')
  const {user} = useAuth()
  const navigate = useNavigate

  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()

  const handleComplete = () => {
    if (pins.length > 0 && !isPlayground) {
      let data
      if (location.state.image.substr(0, 23) === 'data:image/jpeg;base64,') {
        data = {
          name: palaceName,
          image: location.state.image.substr(23),
          embededPins: pins,
          createdBy: user.id,
        }
      } else {
        data = {
          name: palaceName,
          image: location.state.image.substr(22),
          embededPins: pins,
          createdBy: user.id,
        }
      }
      console.log(data)
      postPalace(data)
      navigate('/')
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
      {mode === 'edit' && <CustomCursor type="pin" isHover={isHovered} />}
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
                <FixWordDialog open={pinOpen} deletePin={handleDeletePin} isVisible={mode === 'edit'} />
              </Box>
            </Portal>
          )}
        </div>
      </ClickAwayListener>

      <IconButton
        className={styles.togglPinList}
        onClick={() => isPlayground && setMode(mode === 'edit' ? 'memorization' : 'edit')}>
        {mode === 'edit' && (
          <Badge badgeContent={pins.length} color="primary">
            <img src={pinIcon} alt="" className={styles.pinIcon} />
          </Badge>
        )}
        {mode === 'memorization' && <VisibilityOffIcon />}
      </IconButton>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <img
            className={styles.layoutImage}
            src={imageUrl ?? location.state.image}
            alt="map"
            onClick={() => mode === 'edit' && setOpen(Math.random())}
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
        <button onClick={handleComplete} type="submit" disabled={pins.length <= 0}>
          完成!
        </button>
      </form>
    </div>
  )
}
