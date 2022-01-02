import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './SharedPalace.module.css'
import {SharedPalaceType} from '../types'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import GradeIcon from '@mui/icons-material/Grade'
import Dialog from '@mui/material/Dialog'
import useAuth from '../components/UserProvider'
import {DialogActions, DialogTitle} from '@mui/material'
import {putSharePalace, postPalace} from '../api/palace'
import {Menu} from '@mui/material'

interface PalaceProps {
  num: number
  palace: SharedPalaceType
  deletePalace: (number: number) => void
}

const SharedPalace: React.VFC<PalaceProps> = ({num, palace, deletePalace}) => {
  const [saveIsOpen, setSaveIsOpen] = useState(false)
  const navigate = useNavigate()
  const {user} = useAuth()
  const [shareIsOpen, setShareIsOpen] = useState(false)
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleShare() {
    putSharePalace(palace.id, false)
    deletePalace(num)
    setShareIsOpen(false)
    handleClose()
  }
  function handleSave() {
    const data = {
      name: palace.name,
      image: palace.image,
      embededPins: palace.embededPins,
      createdBy: palace.createdBy,
      originalID: palace.id,
    }
    postPalace(data)
    handleClose()
  }
  function Extension() {
    switch (palace.image.substring(0, 5)) {
      case 'iVBOR':
        return 'data:image/png;base64,' + palace.image
      case 'R0IGO':
        return 'data:image/gif;base64,' + palace.image
      case '/9j/4':
        return 'data:image/jpeg;base64,' + palace.image
    }
  }

  return (
    <div className={styles.sharedPalace}>
      {/* <Link to={'/memorize/' + palace.id} className={styles.image}>
        <img src={palace.image} alt={palace.name} />
      </Link> */}
      <img className={styles.image} src={Extension()} alt={palace.name} onClick={() => setConfirmIsOpen(true)} />
      {/*stateによって変える*/}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{palace.name}</h1>
        <button className={styles.moreVertIcon} onClick={handleClick}>
          <MoreVertIcon />
        </button>
      </div>
      <div className={styles.tag}>
        <CommentIcon className={styles.icon} />
        単語数:{palace.embededPins.length}
      </div>
      <div className={styles.tag}>
        <AccessibilityNewIcon className={styles.icon} />
        <span>作成者:{palace.createrName}</span>
      </div>
      <div className={styles.tag}>
        <GradeIcon className={styles.icon} />
        <span>保存者数:{palace.savedCount}</span>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={styles.menu}>
        <div className={styles.card}>
          <button onClick={() => setSaveIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>宮殿の保存</span>
          </button>
          <Dialog open={saveIsOpen} onClose={() => setSaveIsOpen(false)}>
            <DialogTitle>本当に宮殿を保存しますか？</DialogTitle>
            <DialogActions>
              <button onClick={handleSave} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setSaveIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
          <div className={styles.divider} />
          <button onClick={() => setShareIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>宮殿の共有設定</span>
          </button>
          <Dialog open={shareIsOpen} onClose={() => setShareIsOpen(false)}>
            <DialogTitle>宮殿の共有をやめますか？</DialogTitle>
            <DialogActions>
              <button onClick={handleShare} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setShareIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
          <Dialog open={confirmIsOpen} onClose={() => setConfirmIsOpen(false)}>
            <DialogTitle>この宮殿の暗記を始めますか？</DialogTitle>
            <DialogActions>
              <button
                onClick={() => navigate('/memorize/' + palace.id, {state: {shared: false}})}
                className={styles.button1}>
                はい
              </button>
              <button onClick={() => setConfirmIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </Menu>
    </div>
  )
}

export default SharedPalace
