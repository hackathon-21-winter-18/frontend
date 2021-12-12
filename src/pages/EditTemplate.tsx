import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import useAuth from '../components/UserProvider'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {Pin, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {config} from '../config'
import axios from 'axios'

type Mode = 'edit' | 'memorization'

interface EditProps {
  imageUrl?: string
  isPlayground?: boolean
}

export const EditTemplate: React.VFC<EditProps> = ({imageUrl, isPlayground = false}) => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<Pin | null>(null)
  const [pins, setPins] = React.useState<Pin[]>([])
  const [mode, setMode] = React.useState<Mode>('edit')
  const image = useParams() //あとで使うかも
  const location = useLocation()
  const [templateName, setTemplateName] = React.useState('')
  const [shareOption, setShareOption] = React.useState(false)
  const {user} = useAuth()

  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()

  const handleComplete = () => {
    if (pins.length > 0 && !isPlayground) {
      let data
      if (location.state.image.substr(0, 23) === 'data:image/jpeg;base64,') {
        data = {
          name: templateName,
          image: location.state.image.substr(23),
          pins: pins,
          createdBy: user.id,
        }
      } else {
        data = {
          name: templateName,
          image: location.state.image.substr(22),
          pins: pins,
          createdBy: user.id,
        }
      }
      console.log(data)
      axios
        .post(config() + '/api/templates/me', data, {withCredentials: true})
        .then((res: any) => {
          console.log(res.status)
          const templateId = res.data.id
          if (shareOption) {
            axios
              .put(config() + '/api/templates/share/' + templateId, {share: shareOption}, {withCredentials: true})
              .then((res: any) => console.log(res.status))
              .catch((error: any) => {
                console.log(error)
              })
          }
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }
  React.useEffect(() => {
    setPins([])
  }, [useLocation()])

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
  const handlePinClick = React.useCallback((pin: Pin) => {
    setPinOpen(pin)
  }, [])
  const handleDeletePin = React.useCallback(
    (pin: Pin) => {
      setPins(pins.filter((tmp) => tmp !== pin))
      setPinOpen(null)
    },
    [pins]
  )

  return (
    <div>
      {mode === 'edit' && <CustomCursor type="pin" isHover={isHovered} />}
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
          value={templateName}
          placeholder="テンプレートの名前"
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <label>
          <input type="checkbox" onClick={() => setShareOption(!shareOption)} id="sharedCheckBox" />
          共有
        </label>
        <button onClick={handleComplete} type="submit" disabled={pins.length <= 0}>
          完成!
        </button>
      </form>
    </div>
  )
}
