import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation} from 'react-router'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, ClickAwayListener, IconButton, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import pinIcon from '../assets/pin.svg'
import redPinIcon from '../assets/redPin.svg'
import bluePinIcon from '../assets/bluePin.svg'
import yellowPinIcon from '../assets/yellowPin.svg'
import {getTemplate, putShareTemplate, putTemplate} from '../api/template'
import {Pin} from '../types'
import {useNavigate} from 'react-router-dom'
import useAuth from '../components/UserProvider'
import Popover from '@mui/material/Popover'
import DeleteIcon from '@mui/icons-material/Delete'

export const FixTemplate: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<Pin | null>(null)
  const [pins, setPins] = React.useState<Pin[]>([])
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [templateName, setTemplateName] = React.useState('')
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [shareOption, setShareOption] = React.useState(false)
  const [templateId, setTemplateId] = React.useState('')
  const [templateCreatedBy, setTemplateCreatedBy] = React.useState('')
  const {user} = useAuth()
  const [groupNumber, setGroupNumber] = React.useState(0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const popOpen = Boolean(anchorEl)

  React.useEffect(() => {
    const templateID = params.id
    templateID &&
      getTemplate((res) => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === templateID) {
            setTemplateName(data[i].name)
            setPins(data[i].pins)
            setTemplateId(data[i].id)
            setTemplateCreatedBy(data[i].createdBy)
            setShareOption(data[i].share)
          }
        }
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleComplete = () => {
    if (!(pins.length <= 0 || templateName === '')) {
      let willSendImage = ''
      if (location.state.image.substr(0, 23) === 'data:image/jpeg;base64,') {
        willSendImage = location.state.image.substring(23)
      } else {
        willSendImage = location.state.image.substring(22)
      }
      const data = {
        name: templateName,
        image: willSendImage,
        pins: pins,
      }

      putTemplate(templateId, data, () => {
        const data = {
          share: shareOption,
          createdBy: templateCreatedBy,
        }
        putShareTemplate(templateId, data)
      })
      setCompleteIsOpen(true)
    } else {
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
    [open] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const putPin = React.useCallback(() => {
    const data = {
      number: pins.length,
      x: x,
      y: y,
      groupNumber: groupNumber,
    }
    setPins([...pins, data])
    setOpen(false)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePinClick = React.useCallback(
    (i) => {
      let pinsCopy = [...pins]
      pinsCopy.splice(i, 1)
      setPins(pinsCopy)
    },
    [pins]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeletePin = React.useCallback(
    (pin: Pin) => {
      let pinsCopy = [...pins]
      for (let i = pin.number + 1; i < pins.length; i++) {
        pinsCopy[i].number -= 1
      }
      setPins(pinsCopy)
      setPins(pins.filter((tmp) => tmp !== pin))
      setPinOpen(null)
    },
    [pins]
  )
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handlePinChange = (number: number) => {
    let pinsCopy = [...pins]
    pinsCopy[number].groupNumber = (pinsCopy[number].groupNumber + 1) % 4
    setPins(pinsCopy)
  }
  const pinsList = pins.map((pin, index) => (
    <li key={pin.number} className={styles.li}>
      <div className={styles.inputContainer}>
        {pin.number + '.'}
        <button onClick={() => handlePinChange(pin.number)} className={styles.listPinIconButton}>
          <img
            className={styles.listPinIcon}
            src={
              pin.groupNumber === 0
                ? pinIcon
                : pin.groupNumber === 1
                ? redPinIcon
                : pin.groupNumber === 2
                ? bluePinIcon
                : yellowPinIcon
            }
            alt=""
          />
        </button>
        <IconButton onClick={() => handleDeletePin(pin)} className={styles.trashButton}>
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  ))

  return (
    <div className={styles.edit}>
      <CustomCursor type="pin" isHover={isHovered} />
      <ClickAwayListener onClickAway={() => setPinOpen(null)}>
        <div>
          {pins.map((pin, i) => (
            <div
              className={styles.pushedPin}
              style={{
                position: 'absolute',
                top: pin.y - 68 + 'px',
                left: pin.x + 'px',
                transform: `translate(-50%, -100%)`,
              }}>
              <span>{pin.number}.</span>
              <img
                className={styles.pushedPinImg}
                key={i}
                src={
                  pin.groupNumber === 0
                    ? pinIcon
                    : pin.groupNumber === 1
                    ? redPinIcon
                    : pin.groupNumber === 2
                    ? bluePinIcon
                    : yellowPinIcon
                }
                alt=""
                onClick={() => {
                  handleDeletePin(pin)
                }}
              />
            </div>
          ))}
        </div>
      </ClickAwayListener>

      <IconButton className={styles.togglPinList} onClick={handleClick}>
        <Badge badgeContent={pins.length} color="primary">
          <img src={pinIcon} alt="" className={styles.pinIcon} />
        </Badge>
      </IconButton>
      <div className={styles.card}>
        ピンリスト
        <ul>{pinsList}</ul>
      </div>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={styles.image}>
          <img
            className={styles.layoutImage}
            src={location.state.image}
            alt=""
            onClick={() => setOpen(Math.random())}
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
          placeholder="テンプレートの名前"
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>
      <div className={styles.form}>
        <form>
          <label>
            <input
              type="checkbox"
              checked={shareOption}
              onClick={() => setShareOption(!shareOption)}
              id="sharedCheckBox"
            />
            <span>テンプレートを共有</span>
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
            <span>テンプレートの修正を完了する</span>
          </button>
        </form>
      </div>
      <Dialog open={isOpen && !(pins.length <= 0 || templateName === '')} onClose={() => setIsOpen(false)}>
        <DialogTitle>
          <span>本当にテンプレートの修正を完了しますか？</span>
        </DialogTitle>
        <DialogActions>
          <button
            onClick={() => {
              setIsOpen(false)
              handleComplete()
            }}
            className={styles.button1}>
            <span>はい</span>
          </button>
          <button onClick={() => setIsOpen(false)} className={styles.button2}>
            <span>いいえ</span>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={completeIsOpen} PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>
          <span>🎉テンプレートが修正されました🎉</span>
        </DialogTitle>
        <DialogActions>
          <button onClick={() => navigate('/palace')} className={styles.button2}>
            <span>トップへ戻る</span>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpen && (pins.length <= 0 || templateName === '')}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>
          <span>ピンが登録されていないか、テンプレートの名前が登録されていません</span>
        </DialogTitle>
        <DialogActions>
          <button onClick={() => setIsOpen(false)} className={styles.button2}>
            <span>戻る</span>
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
