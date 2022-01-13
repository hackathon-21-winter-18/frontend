import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation, useNavigate} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPin, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import redPinIcon from '../assets/redPin.svg'
import bluePinIcon from '../assets/bluePin.svg'
import yellowPinIcon from '../assets/yellowPin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import {getPalace, putPalace, putSharePalace} from '../api/palace'
import useAuth from '../components/UserProvider'
import Popover from '@mui/material/Popover'
import HidableWord from '../components/HidableWord'
import DeleteIcon from '@mui/icons-material/Delete'

export const Fix: React.VFC = () => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPin | null>(null)
  const [pins, setPins] = React.useState<EmbededPin[]>([])
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [palaceName, setPalaceName] = React.useState('')
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [shareOption, setShareOption] = React.useState(false)
  const [palaceId, setPalaceId] = React.useState('')
  const [palaceCreatedBy, setPalaceCreatedBy] = React.useState('')
  const {user} = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const popOpen = Boolean(anchorEl)
  const [groups, setGroups] = React.useState<string[]>(['', '', ''])

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
            setPalaceCreatedBy(data[i].createdBy)
            let groups: string[] = [data[i].group1, data[i].group2, data[i].group3]
            setGroups(groups)
            setShareOption(data[i].share)
          }
        }
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleComplete = () => {
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
        group1: groups[0],
        group2: groups[1],
        group3: groups[2],
      }

      params.id &&
        putPalace(params.id, data, () => {
          const data = {
            share: shareOption,
            createdBy: palaceCreatedBy,
          }
          putSharePalace(palaceId, data)
        })
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

  const putPin = React.useCallback(
    (pin: PinContent) => {
      const data = {
        word: pin.word,
        place: pin.place,
        situation: pin.situation,
        groupNumber: pin.groupNumber,
        number: pins.length,
        x: x,
        y: y,
      }
      setPins([...pins, data])
      setOpen(false)
    },
    [open] // eslint-disable-line react-hooks/exhaustive-deps
  )
  const handlePinClick = React.useCallback((pin: EmbededPin) => {
    setPinOpen(pin)
  }, [])
  const handleDeletePin = React.useCallback(
    (pin: EmbededPin) => {
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
  function handlePinsChange(e: React.ChangeEvent<HTMLInputElement>, index: number, type: string) {
    let pinsCopy = [...pins]
    switch (type) {
      case 'word':
        pinsCopy[index].word = e.target.value
        break
      case 'place':
        pinsCopy[index].place = e.target.value
        break
      case 'situation':
        pinsCopy[index].situation = e.target.value
        break
    }
    setPins(pinsCopy)
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
        <input
          type="text"
          value={pin.word}
          onChange={(e) => handlePinsChange(e, index, 'word')}
          className={styles.pinInput}
        />
        <span>が</span>
        <input
          type="text"
          value={pin.place}
          onChange={(e) => handlePinsChange(e, index, 'place')}
          className={styles.pinInput}
        />
        <span>で</span>
        <input
          type="text"
          value={pin.situation}
          onChange={(e) => handlePinsChange(e, index, 'situation')}
          className={styles.pinInput}
        />
        <IconButton onClick={() => handleDeletePin(pin)} className={styles.trashButton}>
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  ))
  function handleGroupsChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    let groupsCopy = [...groups]
    groupsCopy[index] = e.target.value
    setGroups(groupsCopy)
  }
  function close() {
    setPinOpen(null)
  }
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
                  handlePinClick(pin)
                }}
              />
            </div>
          ))}
          {pinOpen && (
            <Portal>
              <Box sx={boxStyle()}>
                <AddNewWordDialog
                  open={!!pinOpen}
                  close={close}
                  putPin={putPin}
                  deletePin={handleDeletePin}
                  pinContent={pinOpen}
                  pins={pins}
                  setPins={setPins}
                />
              </Box>
            </Portal>
          )}
        </div>
      </ClickAwayListener>

      <IconButton className={styles.togglPinList} onClick={handleClick}>
        <Badge badgeContent={pins.length} color="primary">
          <img src={pinIcon} alt="" className={styles.pinIcon} />
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
              <input
                type="text"
                value={group}
                onChange={(e) => handleGroupsChange(e, index)}
                className={styles.groupNameInput}
              />
            </li>
          ))}
        </ul>
        ピンリスト
        <ul>{pinsList}</ul>
      </div>

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
            <input
              type="checkbox"
              checked={shareOption}
              onClick={() => setShareOption(!shareOption)}
              id="sharedCheckBox"
            />
            <span>宮殿を共有</span>
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
            <span>記憶の宮殿の修正を完了する</span>
          </button>
        </form>
      </div>
      <Dialog open={isOpen && !(pins.length <= 0 || palaceName === '')} onClose={() => setIsOpen(false)}>
        <DialogTitle>
          <span>本当に宮殿の修正を完了しますか？</span>
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
          <span>🎉宮殿が修正されました🎉</span>
        </DialogTitle>
        <DialogActions>
          <button
            onClick={() => navigate('/memorize/' + palaceId, {state: {shared: false}})}
            className={styles.button1}>
            <span>今すぐ覚える</span>
          </button>
        </DialogActions>
        <DialogActions>
          <button onClick={() => navigate('/palace')} className={styles.button2}>
            <span>トップへ戻る</span>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpen && (pins.length <= 0 || palaceName === '')}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>
          <span>単語が登録されていないか、宮殿の名前が登録されていません</span>
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
