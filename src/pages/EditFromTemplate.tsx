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

type Mode = 'edit' | 'memorization'

interface EditProps {
  imageUrl?: string
  isPlayground?: boolean
}

export const EditFromTemplate: React.VFC<EditProps> = ({imageUrl, isPlayground = false}) => {
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
                    groupNumber: 0,
                  },
                ])
                setPins(prePins)
                setTemplateCreatedBy(data[i].createdBy)
                setImage(Extension(data[i].image))
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
                    groupNumber: 0,
                  },
                ])
                setPins(prePins)
                setTemplateCreatedBy(data[i].createdBy)
                setImage(Extension(data[i].image))
              }
            }
          }
        })
    }
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleComplete = () => {
    if (!(pins.length <= 0 || palaceName === '')) {
      let data
      if (location.state.image.substr(0, 23) === 'data:image/jpeg;base64,') {
        data = {
          name: palaceName,
          image: location.state.image.substr(23),
          embededPins: pins,
          createdBy: user.id,
        }
      } else {
        data = {
          name: palaceName,
          image: location.state.image.substr(22),
          embededPins: pins,
          createdBy: user.id,
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
      setPins(pins.filter((tmp) => tmp !== pin))
      setPinOpen(null)
    },
    [pins]
  )

  return (
    <div className={styles.edit}>
      {mode === 'edit' && <CustomCursor type="pin" isHover={isHovered} />}
      <ClickAwayListener onClickAway={() => setPinOpen(null)}>
        <div>
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
              onClick={() => {
                handlePinClick(pin)
              }}
            />
          ))}
          {pinOpen && (
            <Portal>
              <Box sx={boxStyle()}>
                <AddNewWordDialog
                  open={!!pinOpen}
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
            src={imageUrl ?? image}
            alt=""
            onClick={() => mode === 'edit' && setOpen(Math.random())}
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
            <input type="checkbox" onClick={() => setShareOption(!shareOption)} />
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
            <span>記憶の宮殿を作成する</span>
          </button>
        </form>
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
