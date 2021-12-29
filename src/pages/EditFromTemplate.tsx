import * as React from 'react'
import styles from './Edit.module.css'
import {Link} from 'react-router-dom'
import {useParams, useLocation, useNavigate} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import useAuth from '../components/UserProvider'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import {postPalace, putSharePalace} from '../api/palace'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {getTemplate, getSharedTemplate} from '../api/template'

type Mode = 'edit' | 'memorization'

interface EditProps {
  imageUrl?: string
  isPlayground?: boolean
}

export const EditFromTemplate: React.VFC<EditProps> = ({imageUrl, isPlayground = false}) => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const [mode, setMode] = React.useState<Mode>('edit')
  const location = useLocation()
  const [palaceName, setPalaceName] = React.useState('')
  const [shareOption, setShareOption] = React.useState(false)
  const {user} = useAuth()
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const [palaceId, setPalaceId] = React.useState('')
  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()

  React.useEffect(() => {
    const templateID = params.id
    if (location.state.share) {
      templateID &&
        getSharedTemplate((res) => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === templateID) {
              for (let j = 0; j < data[i].pins.length; j++) {
                setPins(
                  pins.concat([
                    {
                      number: data[i].pins[j].number,
                      x: data[i].pins[j].x,
                      y: data[i].pins[j].y,
                      word: '',
                      place: '',
                      condition: '',
                    },
                  ])
                )
              }
            }
          }
        })
    } else {
      templateID &&
        getTemplate((res) => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === templateID) {
              for (let j = 0; j < data[i].pins.length; j++) {
                console.log(data[i].pins[j])
                setPins(
                  pins.concat([
                    {
                      number: data[i].pins[j].number,
                      x: data[i].pins[j].x,
                      y: data[i].pins[j].y,
                      word: '',
                      place: '',
                      condition: '',
                    },
                  ])
                )
              }
            }
          }
        })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleComplete = (e: any) => {
    e.preventDefault()
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
      console.log(data)
      postPalace(data, (res: any) => {
        setPalaceId(res.data.id)
        if (shareOption) {
          putSharePalace(res.data.id, shareOption)
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
        condition: pin.condition,
        number: pins.length,
        x: (x - hoverRef.current.x) / hoverRef.current.width,
        y: (y - hoverRef.current.y) / hoverRef.current.height,
      }
      setPins([...pins, data])
      setOpen(false)
    },
    [open] // eslint-disable-line react-hooks/exhaustive-deps
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
                <FixWordDialog open={pinOpen} deletePin={handleDeletePin} isVisible={mode === 'edit'} />
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
            src={imageUrl ?? location.state.image}
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
      <button onClick={() => console.log(pins)}>ボタン</button>
      <div className={styles.form}>
        <form>
          <label>
            <input type="checkbox" onClick={() => setShareOption(!shareOption)} />
            宮殿を共有
          </label>
          <br />
          <button onClick={handleComplete} type="submit" className={styles.completeButton}>
            <CheckCircleIcon />
            <span>記憶の宮殿を作成する</span>
          </button>
        </form>
      </div>
      <Dialog
        open={completeIsOpen && !(pins.length <= 0 || palaceName === '')}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>🎉宮殿が完成しました🎉</DialogTitle>
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
