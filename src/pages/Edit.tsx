import * as React from 'react'
import styles from './Edit.module.css'
import {Pin} from '../types'
import {useLocation, useNavigate} from 'react-router'
import AddNewWordDialog from '../components/AddNewWordDialog'
import useAuth from '../components/UserProvider'
import {useMousePosition} from '../hooks/useMousePosition'
import {CustomCursor} from '../components/CustomCursor'
import {Badge, Box, ClickAwayListener, IconButton, Portal, SxProps} from '@mui/material'
import {useHover} from '../hooks/useHover'
import {EmbededPins, PinContent} from '../types'
import pinIcon from '../assets/pin.svg'
import {FixWordDialog} from '../components/FixWordDialog'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Dialog from '@mui/material/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {postTemplate, putShareTemplate} from '../api/template'
import {postPalace, putSharePalace} from '../api/palace'

type Mode = 'edit' | 'memorization'

interface EditProps {
  imageUrl?: string
  isPlayground?: boolean
  xGap?: number
  yGap?: number
}

export const Edit: React.VFC<EditProps> = ({imageUrl, isPlayground = false, xGap = 0, yGap = 0}) => {
  const [open, setOpen] = React.useState<number | boolean>(false)
  const [pinOpen, setPinOpen] = React.useState<EmbededPins | null>(null)
  const [pins, setPins] = React.useState<EmbededPins[]>([])
  const [mode, setMode] = React.useState<Mode>('edit')
  const [palaceName, setPalaceName] = React.useState('')
  const [palaceId, setPalaceId] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [shareOption, setShareOption] = React.useState(false)
  const [templateOption, setTemplateOption] = React.useState(false)
  const [templateShareOption, setTemplateShareOption] = React.useState(false)
  const {user} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [hoverRef, isHovered] = useHover<HTMLImageElement>()
  const {x, y} = useMousePosition()

  const handleComplete = () => {
    if (!isPlayground && !(pins.length <= 0 || palaceName === '')) {
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
        createdBy: user.id,
      }
      postPalace(data, (res: any) => {
        if (shareOption) {
          putSharePalace(res.data.id, shareOption)
        }
        setPalaceId(res.data.id)
      })

      if (templateOption) {
        let templatePins = new Array<Pin>()
        for (let i = 0; i < templatePins.length; i++) {
          templatePins.push({
            number: i,
            x: pins[i].x,
            y: pins[i].y,
          })
        }
        const data2 = {
          name: palaceName,
          image: willSendImage,
          pins: pins,
          createdBy: user.id,
        }
        postTemplate(data2, (res: any) =>
          templateShareOption ? putShareTemplate(res.data.id, templateShareOption) : null
        )
      }
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
        number: pins.length,
        x: x,
        y: y,
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
  React.useEffect(() => {
    setPins([])
    setPalaceName('')
  }, [location])

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
                top: pin.y - 68 - yGap + 'px',
                left: pin.x - xGap + 'px',
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
                  setOpen={setOpen}
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
      <div className={styles.form}>
        <form>
          <label>
            <input type="checkbox" onClick={() => setTemplateOption(!templateOption)} />
            テンプレートとして保存
          </label>
          <br />
          <label>
            <input type="checkbox" onClick={() => setShareOption(!shareOption)} id="sharedCheckBox" />
            宮殿を共有
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              onClick={() => setTemplateShareOption(!templateShareOption)}
              disabled={!templateOption}
            />
            テンプレートとして共有
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
      <button onClick={() => console.log(pins)}>ボタン</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>本当に宮殿を作成しますか？</DialogTitle>
        <DialogActions>
          <button
            onClick={() => {
              setIsOpen(false)
              handleComplete()
            }}
            className={styles.button1}>
            はい
          </button>
          <button onClick={() => setIsOpen(false)} className={styles.button2}>
            いいえ
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={completeIsOpen && !isPlayground && !(pins.length <= 0 || palaceName === '')}
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
          <button onClick={() => navigate('/')} className={styles.button2}>
            ホームへ戻る
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={completeIsOpen && !isPlayground && (pins.length <= 0 || palaceName === '')}
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
      <Dialog
        open={completeIsOpen && isPlayground}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogTitle style={{textAlign: 'center'}}>次は実際に宮殿を作成してみましょう!</DialogTitle>
        <DialogActions>
          <button onClick={() => setCompleteIsOpen(false)} className={styles.button2}>
            OK
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
