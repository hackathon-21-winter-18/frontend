import * as React from 'react'
import styles from './Edit.module.css'
import {useNavigate} from 'react-router-dom'
import {useParams, useLocation} from 'react-router'
import {useMousePosition} from '../hooks/useMousePosition'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPin} from '../types'
import pinIcon from '../assets/pin.svg'
import greenPinIcon from '../assets/greenPin.svg'
import redPinIcon from '../assets/redPin.svg'
import bluePinIcon from '../assets/bluePin.svg'
import yellowPinIcon from '../assets/yellowPin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {getPalace, getSharedPalace} from '../api/palace'
import Popover from '@mui/material/Popover'
import HidableWord from '../components/HidableWord'
import {Extension} from '../util/extension'

const Memorize: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPin | null>(null)
  const [pins, setPins] = React.useState<EmbededPin[]>([])
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
  const [groups, setGroups] = React.useState<string[]>(new Array<string>())

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
              setGroups([data[i].group1, data[i].group2, data[i].group3])
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
              setGroups([data[i].group1, data[i].group2, data[i].group3])
              let preFlags = Array(data[i].embededPins.length)
              setFlags(preFlags.fill(false))
            }
          }
        })
    }
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handlePinClick = React.useCallback((pin: EmbededPin) => {
    setPinOpen(pin)
  }, [])
  const handleDeletePin = React.useCallback(
    (pin: EmbededPin) => {
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
        {pin.number + '.'}
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
        <HidableWord text={pin.word} isVisible={flags[index] || !pin.word} />
        <span>が</span>
        <HidableWord text={pin.place} isVisible={flags[index] || !pin.place} />
        <span>で</span>
        <HidableWord text={pin.situation} isVisible={flags[index] || !pin.situation} />
      </div>
      <IconButton
        onClick={() => {
          let flagsCopy = [...flags]
          flagsCopy[index] = true
          setFlags(flagsCopy)
        }}
        color={flags![index] ? 'primary' : 'error'}>
        <span>完了</span>
      </IconButton>
    </li>
  ))

  return (
    <div className={styles.edit}>
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
                  flags[i]
                    ? greenPinIcon
                    : pin.groupNumber === 0
                    ? pinIcon
                    : pin.groupNumber === 1
                    ? redPinIcon
                    : pin.groupNumber === 2
                    ? bluePinIcon
                    : yellowPinIcon
                }
                alt=""
                onClick={() => {
                  handlePinClick(pin)
                }}
              />
            </div>
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
      <div className={styles.card}>
        グループ
        <ul>
          {groups.map((group, index) => (
            <li key={index}>
              <img
                className={styles.listPinIcon}
                src={index === 0 ? redPinIcon : index === 1 ? bluePinIcon : yellowPinIcon}
                alt=""
              />
              <div className={styles.groupName}>
                <span>{group}</span>
              </div>
            </li>
          ))}
        </ul>
        ピンリスト
        <ul>{pinsList}</ul>
      </div>

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
        <DialogTitle>
          <span>本当に暗記を完了しますか？</span>
        </DialogTitle>
        <DialogActions>
          <button
            onClick={() => {
              setIsOpen(false)
              setCompleteIsOpen(true)
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
          <span>🎉お疲れさまでした🎉</span>
        </DialogTitle>
        <DialogActions>
          <button onClick={() => navigate('/palace')} className={styles.button2}>
            <span>トップへ戻る</span>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpen && !flags.every((value) => value)}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>
          <span>まだ暗記が終わってません</span>
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

export default Memorize
