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
import {getTemplate, postTemplate, putTemplate} from '../api/template'
import {Pin} from '../types'

export const FixTemplate: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<Pin | null>(null)
  const [pins, setPins] = React.useState<Pin[]>([])
  const params = useParams()
  const location = useLocation()
  const [templateName, setTemplateName] = React.useState('')
  const {user} = useAuth()
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [shareOption, setShareOption] = React.useState(false)

  React.useEffect(() => {
    const templateID = params.id
    templateID &&
      getTemplate().then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === templateID) {
            setTemplateName(data[i].name)
            setPins(data[i].pins)
          }
        }
      })
  }, [])

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
        name: templateName,
        image: willSendImage,
        embededPins: pins,
      }
      console.log(data)
      params.id && putTemplate(params.id, data)
      setCompleteIsOpen(true)
    }
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  const pinStyle = React.useCallback<() => React.CSSProperties>(
    () => ({
      position: 'fixed',
      top: y,
      left: x,
      transform: `translate(-50%, -100%)`,
    }),
    [open]
  )

  const putPin = React.useCallback(() => {
    const data = {
      number: pins.length,
      x: (x - hoverRef.current.x) / hoverRef.current.width,
      y: (y - hoverRef.current.y) / hoverRef.current.height,
    }
    setPins([...pins, data])
    setOpen(false)
  }, [open])
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
            alt="map"
            onClick={() => setOpen(Math.random())}
            ref={hoverRef}
          />
          {open && putPin()}
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
        <button onClick={handleComplete} type="submit" disabled={pins.length <= 0 || templateName === ''}>
          完成!
        </button>
      </form>
      <Dialog open={completeIsOpen}>
        テンプレートが修正されました
        <Link to="/">ホームへ戻る</Link>
      </Dialog>
    </div>
  )
}
