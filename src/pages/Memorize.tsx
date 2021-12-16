import * as React from 'react'
import styles from './Edit.module.css'
import {Link} from 'react-router-dom'
import {EditAddedWord} from '../components/EditAddedWord'
import PushPinIcon from '@mui/icons-material/PushPin'
import {Pin} from '../types'
import {useParams, useLocation, useNavigate} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import useAuth from '../components/UserProvider'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Dialog from '@mui/material/Dialog'
import {postTemplate, putShareTemplate} from '../api/template'
import {postPalace, putSharePalace, getPalace} from '../api/palace'

const Memorize: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const params = useParams()
  const location = useLocation()
  const [palaceName, setPalaceName] = React.useState('')
  const {user} = useAuth()
  const [palaceId, setPalaceId] = React.useState('')
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const [shareOption, setShareOption] = React.useState(false)
  const [templateOption, setTemplateOption] = React.useState(false)
  const [templateShareOption, setTemplateShareOption] = React.useState(false)
  const [templateId, setTemplateId] = React.useState('')
  const [palaceImage, setPalaceImage] = React.useState('')
  const [flags, setFlags] = React.useState(new Array<boolean>())

  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()

  function Extension(image: string) {
    switch (image.substring(0, 5)) {
      case 'iVBOR':
        return 'data:image/png;base64,' + image
      case 'R0IGO':
        return 'data:image/gif;base64,' + image
      case '/9j/4':
        return 'data:image/jpeg;base64,' + image
    }
  }
  React.useEffect(() => {
    const palaceID = params.id
    palaceID &&
      getPalace().then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === palaceID) {
            setPalaceName(data[i].name)
            setPins(data[i].embededPins)
            setPalaceId(data[i].id)
            setPalaceImage(data[i].image)
            let preFlags = Array(data[i].embededPins.length)
            setFlags(preFlags.fill(false))
          }
        }
      })
  }, [])

  const handleComplete = (e: any) => {
    e.preventDefault()
    setCompleteIsOpen(true)
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

  React.useEffect(() => {
    setPins([])
    setPalaceName('')
  }, [location])

  return (
    <div className={styles.edit}>
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
                <FixWordDialog
                  open={pinOpen}
                  deletePin={handleDeletePin}
                  isVisible={false}
                  flags={flags}
                  setFlags={setFlags}
                />
              </Box>
            </Portal>
          )}
        </div>
      </ClickAwayListener>
      <IconButton className={styles.togglPinList}>
        <Badge badgeContent={pins.length} color="primary">
          <img src={pinIcon} alt="pinIcon" className={styles.pinIcon} />
        </Badge>
      </IconButton>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <img
            className={styles.layoutImage}
            src={Extension(palaceImage) ?? location.state.image}
            alt="map"
            ref={hoverRef}
          />
        </div>
      </ClickAwayListener>

      <button onClick={handleComplete} type="submit" disabled={!flags.every((value) => value)}>
        暗記完了!
      </button>
      <Dialog open={completeIsOpen}>
        お疲れさまでした。
        <Link to="/">ホームへ戻る</Link>
      </Dialog>
    </div>
  )
}

export default Memorize
