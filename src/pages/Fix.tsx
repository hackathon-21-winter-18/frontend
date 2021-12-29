import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation, useNavigate} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {Link} from 'react-router-dom'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import {getPalace, putPalace, putSharePalace} from '../api/palace'

export const Fix: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [palaceName, setPalaceName] = React.useState('')
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [shareOption, setShareOption] = React.useState(false)
  const [palaceId, setPalaceId] = React.useState('')

  React.useEffect(() => {
    const palaceID = params.id
    palaceID &&
      getPalace((res) => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === palaceID) {
            setPalaceName(data[i].name)
            setPins(data[i].embededPins)
            setPalaceId(data[i].id)
          }
        }
      })
  }, [])

  const handleComplete = (e: any) => {
    e.preventDefault()
    if (!(pins.length <= 0 || palaceName === '')) {
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
      params.id && putPalace(params.id, data, () => (shareOption ? putSharePalace(palaceId, shareOption) : null))
      setCompleteIsOpen(true)
    } else {
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
        condition: pin.condition,
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
        <div className={styles.image}>
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

      <div className={styles.nameInputForm}>
        <input
          required
          type="text"
          value={palaceName}
          placeholder="Untitled Palace"
          onChange={(e) => setPalaceName(e.target.value)}
        />
      </div>
      <div className={styles.form}>
        <form>
          <label>
            <input type="checkbox" onClick={() => setShareOption(!shareOption)} id="sharedCheckBox" />
            宮殿を共有
          </label>
          <br />
          <button onClick={handleComplete} type="submit" className={styles.completeButton}>
            <CheckCircleIcon />
            <span>記憶の宮殿の修正を完了する</span>
          </button>
        </form>
      </div>
      <Dialog
        open={completeIsOpen && !(pins.length <= 0 || palaceName === '')}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>🎉宮殿が修正されました🎉</DialogTitle>
        <DialogActions>
          <button
            onClick={() => navigate('/memorize/' + palaceId, {state: {shared: false}})}
            className={styles.button1}>
            今すぐ覚える
          </button>
        </DialogActions>
        <DialogActions>
          <button className={styles.button2}>
            <Link to="/" style={{textDecoration: 'none', color: '#7a8498'}}>
              ホームへ戻る
            </Link>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={completeIsOpen && (pins.length <= 0 || palaceName === '')}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>
          単語が登録されていないか、宮殿の名前が登録されていません
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
