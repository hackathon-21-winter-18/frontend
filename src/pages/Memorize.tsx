import * as React from 'react'
import styles from './Edit.module.css'
import {Link} from 'react-router-dom'
import {useParams, useLocation} from 'react-router'
import {useMousePosition} from '../hooks/useMousePosition'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {getPalace, getSharedPalace} from '../api/palace'

const Memorize: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const params = useParams()
  const location = useLocation()
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
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
        <div className={styles.image}>
          <img className={styles.layoutImage} src={Extension(palaceImage)} alt="map" ref={hoverRef} />
        </div>
      </ClickAwayListener>
      <div className={styles.form}>
        <button onClick={handleComplete} type="submit" className={styles.completeButton}>
          <CheckCircleIcon />
          <span>暗記完了!</span>
        </button>
      </div>
      <Dialog
        open={completeIsOpen && flags.every((value) => value)}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>🎉お疲れさまでした🎉</DialogTitle>
        <DialogActions>
          <button className={styles.button2}>
            <Link to="/" style={{textDecoration: 'none', color: '#7a8498'}}>
              ホームへ戻る
            </Link>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={completeIsOpen && !flags.every((value) => value)}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>まだ暗記が終わってません</DialogTitle>
        <DialogActions>
          <button onClick={() => setCompleteIsOpen(false)} className={styles.button2}>
            戻る
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Memorize
