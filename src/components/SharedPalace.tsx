import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import CommentIcon from '@mui/icons-material/Comment'
import EditIcon from '@mui/icons-material/Edit'
import GradeIcon from '@mui/icons-material/Grade'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {DialogActions, DialogTitle, Menu} from '@mui/material'
import Dialog from '@mui/material/Dialog'

import {postPalace, putSharePalace} from '../api/palace'
import useAuth from '../components/UserProvider'
import {SharedPalaceType} from '../types'
import {Extension} from '../util/extension'
import styles from './SharedPalace.module.css'

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleShare() {
    const data = {
      share: false,
      createdBy: palace.createdBy,
    }
    putSharePalace(palace.id, data)
    deletePalace(num)
    setShareIsOpen(false)
    handleClose()
  }
  function handleSave() {
    const data = {
      name: palace.name,
      image: palace.image,
      embededPins: palace.embededPins,
      createdBy: palace.heldBy,
      originalID: palace.id,
    }
    postPalace(data)
    handleClose()
  }

  return (
    <div className={styles.sharedPalace}>
      <button
        onClick={() => navigate('/memorize/' + palace.id, {state: {shared: true}})}
        className={styles.imageButton}>
        <img className={styles.image} src={Extension(palace.image)} alt={palace.name} />
        <div>
          <span>暗記してみる</span>
        </div>
      </button>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{palace.name}</h1>
        {user.auth ? (
          <button className={styles.moreVertIcon} onClick={handleClick}>
            <MoreVertIcon />
          </button>
        ) : null}
      </div>
      <div className={styles.tag}>
        <CommentIcon className={styles.icon} />
        <span>単語数:{palace.embededPins.length}</span>
      </div>
      <div className={styles.tag}>
        <AccessibilityNewIcon className={styles.icon} />
        <span>作成者:{palace.creatorName}</span>
      </div>
      <div className={styles.tag}>
        <EditIcon className={styles.icon} />
        <span>編集者:{palace.editorName}</span>
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
          {palace.createdBy !== user.id ? (
            <button onClick={() => setSaveIsOpen(true)} className={styles.menuButton}>
              <span className={styles.menuText}>宮殿の保存</span>
            </button>
          ) : null}
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
          {palace.createdBy === user.id ? (
            <button onClick={() => setShareIsOpen(true)} className={styles.menuButton}>
              <span className={styles.menuText}>宮殿の共有設定</span>
            </button>
          ) : null}
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
        </div>
      </Menu>
    </div>
  )
}

export default SharedPalace
