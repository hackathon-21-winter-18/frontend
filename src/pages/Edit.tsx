import * as React from 'react'
import styles from './Edit.module.css'
import {Link} from 'react-router-dom'
import {EditAddedWord} from '../components/EditAddedWord'
import PushPinIcon from '@mui/icons-material/PushPin'
import {Pin} from '../types'
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
import Dialog from '@mui/material/Dialog'
import {postTemplate} from '../api/template'

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
  const [palaceId, setPalaceId] = React.useState('')
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const [templateOption, setTemplateOption] = React.useState(false)

  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()

  const handleComplete = (e: any) => {
    e.preventDefault()
    if (pins.length > 0 && !isPlayground) {
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
        createdBy: user.id,
      }
      console.log(data)
      postPalace(data)
      if (templateOption) {
        let templatePins = new Array<Pin>()
        for (let i = 0; i < templatePins.length; i++) {
          templatePins.push({
            number: i,
            x: pins[i].x,
            y: pins[i].y,
          })
        }
        const data2 = {
          name: palaceName,
          image: willSendImage,
          pins: pins,
          createdBy: user.id,
        }
        postTemplate(data2)
      }
      setCompleteIsOpen(true)
    }
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
    console.log('a')
  }, [location])

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
        <label>
          <input type="checkbox" onClick={() => setTemplateOption(!templateOption)} />
          テンプレートとして保存
        </label>
        <button onClick={handleComplete} type="submit" disabled={pins.length <= 0 || palaceName === ''}>
          完成!
        </button>
      </form>
      <Dialog open={completeIsOpen && !isPlayground}>
        宮殿が完成しました
        <Link to={'/memorize/' + palaceId}>今すぐ覚える</Link>
        <Link to="/">ホームへ戻る</Link>
      </Dialog>
      <Dialog open={completeIsOpen && isPlayground}>
        次は実際に宮殿を作成してみましょう!
        <button onClick={() => setCompleteIsOpen(false)}>OK</button>
      </Dialog>
    </div>
  )
}
