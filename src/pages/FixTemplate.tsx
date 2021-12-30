import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation} from 'react-router'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {Link} from 'react-router-dom'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, ClickAwayListener, IconButton, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import pinIcon from '../assets/pin.svg'
import {getTemplate, putShareTemplate, putTemplate} from '../api/template'
import {Pin} from '../types'

export const FixTemplate: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<Pin | null>(null)
  const [pins, setPins] = React.useState<Pin[]>([])
  const params = useParams()
  const location = useLocation()
  const [templateName, setTemplateName] = React.useState('')
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [shareOption, setShareOption] = React.useState(false)
  const [templateId, setTemplateId] = React.useState('')

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

  const handleComplete = (e: any) => {
    e.preventDefault()
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

      putTemplate(templateId, data, () => (shareOption ? putShareTemplate(templateId, shareOption) : null))
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

  return (
    <div className={styles.edit}>
      <CustomCursor type="pin" isHover={isHovered} />
      <ClickAwayListener onClickAway={() => setPinOpen(null)}>
        <div className={styles.base}>
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

      <IconButton className={styles.togglPinList}>
        <Badge badgeContent={pins.length} color="primary">
          <img src={pinIcon} alt="" className={styles.pinIcon} />
        </Badge>
      </IconButton>

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
            <input type="checkbox" onClick={() => setShareOption(!shareOption)} id="sharedCheckBox" />
            テンプレートを共有
          </label>
          <br />
          <button onClick={handleComplete} type="submit" className={styles.completeButton}>
            <CheckCircleIcon />
            <span>テンプレートの修正を完了する</span>
          </button>
        </form>
      </div>
      <Dialog
        open={completeIsOpen && !(pins.length <= 0 || templateName === '')}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>🎉テンプレートが修正されました🎉</DialogTitle>
        <DialogActions>
          <button className={styles.button2}>
            <Link to="/" style={{textDecoration: 'none', color: '#7a8498'}}>
              ホームへ戻る
            </Link>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={completeIsOpen && (pins.length <= 0 || templateName === '')}
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
