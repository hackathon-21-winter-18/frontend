import * as React from 'react'
import styles from './Edit.module.css'
import {useNavigate} from 'react-router-dom'
import {Pin} from '../types'
import {useLocation} from 'react-router'
import useAuth from '../components/UserProvider'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, ClickAwayListener, IconButton, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import pinIcon from '../assets/pin.svg'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {postTemplate, putShareTemplate} from '../api/template'

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
  const location = useLocation()
  const [templateName, setTemplateName] = React.useState('')
  const {user} = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [shareOption, setShareOption] = React.useState(false)
  const navigate = useNavigate()

  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()

  const handleComplete = () => {
    if (!(pins.length <= 0 || templateName === '')) {
      let willSendImage = ''
      if (location.state.image.substr(0, 23) === 'data:image/jpeg;base64,') {
        willSendImage = location.state.image.substring(23)
      } else {
        willSendImage = location.state.image.substring(22)
      }
      let templatePins = new Array<Pin>()
      for (let i = 0; i < templatePins.length; i++) {
        templatePins.push({
          number: i,
          x: pins[i].x,
          y: pins[i].y,
        })
      }
      const data = {
        name: templateName,
        image: willSendImage,
        pins: pins,
        createdBy: user.id,
      }

      postTemplate(data, (res) => {
        if (shareOption) {
          const data = {
            share: shareOption,
            createdBy: user.id,
          }
          putShareTemplate(res.data.id, data)
        }
      })
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
    [open, pinOpen] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const pinStyle = React.useCallback<() => React.CSSProperties>(
    () => ({
      position: 'fixed',
      top: y,
      left: x,
      transform: `translate(-50%, -100%)`,
    }),
    [open] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const putPin = React.useCallback(() => {
    const data = {
      number: pins.length,
      x: x,
      y: y,
    }
    setPins([...pins, data])
    setOpen(false)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

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
  React.useEffect(() => {
    setPins([])
    setTemplateName('')
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
                top: pin.y - 68 + 'px',
                left: pin.x + 'px',
                transform: `translate(-50%, -100%)`,
              }}
              onClick={() => {
                handlePinClick(pin)
              }}
            />
          ))}
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
        <div className={styles.image}>
          <img
            className={styles.layoutImage}
            src={imageUrl ?? location.state.image}
            alt=""
            onClick={() => mode === 'edit' && setOpen(Math.random())}
            ref={hoverRef}
          />
          {open && putPin()}
        </div>
      </ClickAwayListener>
      <div className={styles.nameInputForm}>
        <input
          required
          type="text"
          value={templateName}
          placeholder="Untitled Template"
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>
      <div className={styles.form}>
        <form>
          <label>
            <input type="checkbox" onClick={() => setShareOption(!shareOption)} />
            テンプレートを共有
          </label>
          <br />
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(true)
            }}
            type="submit"
            className={styles.completeButton}>
            <CheckCircleIcon />
            <span>テンプレートを作成する</span>
          </button>
        </form>
      </div>
      <Dialog open={isOpen && !(pins.length <= 0 || templateName === '')} onClose={() => setIsOpen(false)}>
        <DialogTitle>本当にテンプレートを作成しますか？</DialogTitle>
        <DialogActions>
          <button
            onClick={() => {
              setIsOpen(false)
              handleComplete()
            }}
            className={styles.button1}>
            はい
          </button>
          <button onClick={() => setIsOpen(false)} className={styles.button2}>
            いいえ
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={completeIsOpen} PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>🎉テンプレートが完成しました🎉</DialogTitle>
        <DialogActions>
          <button onClick={() => navigate('/palace')} className={styles.button2}>
            トップへ戻る
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpen && (pins.length <= 0 || templateName === '')}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>
          ピンが登録されていないか、テンプレートの名前が登録されていません
        </DialogTitle>
        <DialogActions>
          <button onClick={() => setCompleteIsOpen(false)} className={styles.button2}>
            戻る
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
