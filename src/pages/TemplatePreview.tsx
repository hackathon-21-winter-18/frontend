import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation, useNavigate} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import useAuth from '../components/UserProvider'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPin, PinContent, TemplateType} from '../types'
import pinIcon from '../assets/pin.svg'
import redPinIcon from '../assets/redPin.svg'
import bluePinIcon from '../assets/bluePin.svg'
import yellowPinIcon from '../assets/yellowPin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import {postPalace, putSharePalace} from '../api/palace'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {getTemplate, getSharedTemplate} from '../api/template'
import {Extension} from '../util/extension'
import Popover from '@mui/material/Popover'
import HidableWord from '../components/HidableWord'
import DeleteIcon from '@mui/icons-material/Delete'

type Mode = 'edit' | 'memorization'

interface EditProps {
  imageUrl?: string
  isPlayground?: boolean
}

export const TemplatePreview: React.VFC<EditProps> = ({imageUrl, isPlayground = false}) => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPin | null>(null)
  const [pins, setPins] = React.useState<EmbededPin[]>([])
  const [mode, setMode] = React.useState<Mode>('edit')
  const location = useLocation()
  const [palaceName, setPalaceName] = React.useState('')
  const [shareOption, setShareOption] = React.useState(false)
  const {user} = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const [palaceId, setPalaceId] = React.useState('')
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const [templateCreatedBy, setTemplateCreatedBy] = React.useState('')
  const [image, setImage] = React.useState('')
  const {x, y} = useMousePosition()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const popOpen = Boolean(anchorEl)
  const [groups, setGroups] = React.useState<string[]>(['', '', ''])

  React.useEffect(() => {
    const templateID = params.id
    if (location.state.shared) {
      templateID &&
        getSharedTemplate((res) => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === templateID) {
              let prePins = new Array<EmbededPin>()
              for (let j = 0; j < data[i].pins.length; j++) {
                prePins = prePins.concat([
                  {
                    number: data[i].pins[j].number,
                    x: data[i].pins[j].x,
                    y: data[i].pins[j].y,
                    word: '',
                    place: '',
                    situation: '',
                    groupNumber: data[i].pins[j].groupNumber,
                  },
                ])
                setPins(prePins)
                setTemplateCreatedBy(data[i].createdBy)
                setImage(data[i].image)
              }
            }
          }
        })
    } else {
      templateID &&
        getTemplate((res) => {
          let data: TemplateType[] = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === templateID) {
              let prePins = new Array<EmbededPin>()
              for (let j = 0; j < data[i].pins.length; j++) {
                prePins = prePins.concat([
                  {
                    number: data[i].pins[j].number,
                    x: data[i].pins[j].x,
                    y: data[i].pins[j].y,
                    word: '',
                    place: '',
                    situation: '',
                    groupNumber: data[i].pins[j].groupNumber,
                  },
                ])
                setPins(prePins)
                setTemplateCreatedBy(data[i].createdBy)
                setImage(data[i].image)
              }
            }
          }
        })
    }
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleComplete = () => {
    if (!(pins.length <= 0 || palaceName === '')) {
      let data
      if (image.substring(23) === 'data:image/jpeg;base64,') {
        data = {
          name: palaceName,
          image: image,
          embededPins: pins,
          createdBy: user.id,
          //createdBy: templateCreatedBy,
          group1: groups[0],
          group2: groups[1],
          group3: groups[2],
        }
      } else {
        data = {
          name: palaceName,
          image: image,
          embededPins: pins,
          createdBy: user.id,
          //createdBy: templateCreatedBy,
          group1: groups[0],
          group2: groups[1],
          group3: groups[2],
        }
      }
      postPalace(data, (res: any) => {
        setPalaceId(res.data.id)
        if (shareOption) {
          const data = {
            share: shareOption,
            createdBy: templateCreatedBy,
          }
          putSharePalace(res.data.id, data)
        }
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
      {pins.map((pin, i) => (
        <img
          className={styles.pushedPin}
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
          style={{
            position: 'absolute',
            top: pin.y - 68 + 'px',
            left: pin.x + 'px',
            transform: `translate(-50%, -100%)`,
          }}
        />
      ))}
      <IconButton className={styles.togglPinList} onClick={handleClick}>
        {mode === 'edit' && (
          <Badge badgeContent={pins.length} color="primary">
            <img src={pinIcon} alt="" className={styles.pinIcon} />
          </Badge>
        )}
        {mode === 'memorization' && <VisibilityOffIcon />}
      </IconButton>
      <div className={styles.card}>
        ピンリスト
        <ul>{pinsList}</ul>
      </div>
      <div className={styles.image}>
        <img className={styles.layoutImage} src={Extension(image)} alt="" ref={hoverRef} />
      </div>
      <Dialog open={isOpen && !(pins.length <= 0 || palaceName === '')} onClose={() => setIsOpen(false)}>
        <DialogTitle>
          <span>本当に宮殿を作成しますか？</span>
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
          <span>🎉宮殿が完成しました🎉</span>
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
