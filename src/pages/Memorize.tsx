import * as React from 'react'
import styles from './Edit.module.css'
import {useNavigate} from 'react-router-dom'
import {useParams, useLocation} from 'react-router'
import {useMousePosition} from '../hooks/useMousePosition'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins} from '../types'
import pinIcon from '../assets/pin.svg'
import greenPinIcon from '../assets/greenPin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {getPalace, getSharedPalace} from '../api/palace'
import Popover from '@mui/material/Popover'
import HidableWord from '../components/HidableWord'

const Memorize: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [palaceImage, setPalaceImage] = React.useState('')
  const [flags, setFlags] = React.useState(new Array<boolean>())
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const popOpen = Boolean(anchorEl)

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
    if (location.state.shared) {
      palaceID &&
        getSharedPalace((res) => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === palaceID) {
              setPins(data[i].embededPins)
              setPalaceImage(data[i].image)
              let preFlags = Array(data[i].embededPins.length)
              setFlags(preFlags.fill(false))
            }
          }
        })
    } else {
      palaceID &&
        getPalace((res) => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === palaceID) {
              setPins(data[i].embededPins)
              setPalaceImage(data[i].image)
              let preFlags = Array(data[i].embededPins.length)
              setFlags(preFlags.fill(false))
            }
          }
        })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [location])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const pinsList = pins.map((pin, index) => (
    <li key={pin.number} className={styles.li}>
      <div className={styles.inputContainer}>
        <HidableWord text={pin.word} isVisible={flags[index]} />が
        <HidableWord text={pin.place} isVisible={flags[index]} />で
        <HidableWord text={pin.situation} isVisible={flags[index]} />
      </div>
      <IconButton
        onClick={() => {
          let flagsCopy = [...flags]
          flagsCopy[index] = true
          setFlags(flagsCopy)
        }}
        color={flags![index] ? 'primary' : 'error'}>
        完了
      </IconButton>
    </li>
  ))

  return (
    <div className={styles.edit}>
      <ClickAwayListener onClickAway={() => setPinOpen(null)}>
        <div>
          {pins.map((pin, i) => (
            <img
              className={styles.pushedPin}
              key={i}
              src={flags[i] ? greenPinIcon : pinIcon}
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
      <IconButton className={styles.togglPinList} onClick={handleClick}>
        <Badge badgeContent={pins.length} color="primary">
          <img src={pinIcon} alt="pinIcon" className={styles.pinIcon} />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={popOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={styles.popover}>
        <div className={styles.card}>
          <ul>{pinsList}</ul>
        </div>
      </Popover>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={styles.image}>
          <img className={styles.layoutImage} src={Extension(palaceImage)} alt="map" ref={hoverRef} />
        </div>
      </ClickAwayListener>
      <div className={styles.form}>
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(true)
          }}
          type="submit"
          className={styles.completeButton}>
          <CheckCircleIcon />
          <span>暗記完了!</span>
        </button>
      </div>
      <Dialog open={isOpen && flags.every((value) => value)} onClose={() => setIsOpen(false)}>
        <DialogTitle>本当に暗記を完了しますか？</DialogTitle>
        <DialogActions>
          <button
            onClick={() => {
              setIsOpen(false)
              setCompleteIsOpen(true)
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
        <DialogTitle style={{textAlign: 'center'}}>🎉お疲れさまでした🎉</DialogTitle>
        <DialogActions>
          <button onClick={() => navigate('/')} className={styles.button2}>
            ホームへ戻る
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpen && !flags.every((value) => value)}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>まだ暗記が終わってません</DialogTitle>
        <DialogActions>
          <button onClick={() => setIsOpen(false)} className={styles.button2}>
            戻る
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Memorize
