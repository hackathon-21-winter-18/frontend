import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Palace.module.css'
import {PalaceType} from '../types'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import GradeIcon from '@mui/icons-material/Grade'
import ShareIcon from '@mui/icons-material/Share'
import {deletePalace, putSharePalace} from '../api/palace'
import userAuth from './UserProvider'
import {postTemplate} from '../api/template'
import {Pin} from '../types'
import {Menu} from '@mui/material'
import {Extension} from '../util/extension'

interface PalaceProps {
  num: number
  palace: PalaceType
  handleDeletePalace: (number: number) => void
}

const Palace: React.VFC<PalaceProps> = ({num, palace, handleDeletePalace}) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [shareIsOpen, setShareIsOpen] = useState(false)
  const [share, setShare] = useState(palace.share)
  const [saveAsTemplateIsOpen, setSaveAsTemplateIsOpen] = useState(false)
  const navigate = useNavigate()
  const {user} = userAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleDelete() {
    deletePalace(palace.id)
    handleDeletePalace(num)
  }
  function handleShare() {
    const data = {
      share: !palace.share,
      createdBy: palace.createdBy,
    }
    putSharePalace(palace.id, data)
    setShare(!share)
    setShareIsOpen(false)
    handleClose()
  }
  function handleSaveAsTemplate() {
    let templatePins = new Array<Pin>()
    for (let i = 0; i < palace.embededPins.length; i++) {
      templatePins.push({
        number: i,
        x: palace.embededPins[i].x,
        y: palace.embededPins[i].y,
        groupNumber: palace.embededPins[i].groupNumber,
      })
    }
    const data = {
      name: palace.name,
      image: palace.image,
      pins: templatePins,
      createdBy: palace.createdBy,
    }
    postTemplate(data)
    setSaveAsTemplateIsOpen(false)
    handleClose()
  }

  return (
    <div className={styles.palace}>
      <button
        onClick={() => navigate('/memorize/' + palace.id, {state: {shared: false}})}
        className={styles.imageButton}>
        <img className={styles.image} src={Extension(palace.image)} alt={palace.name} />
        <div>
          <span>暗記する</span>
        </div>
      </button>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{palace.name}</h1>
        <button className={styles.moreVertIcon} onClick={handleClick}>
          <MoreVertIcon />
        </button>
      </div>
      <div className={styles.tag}>
        <CommentIcon className={styles.icon} />
        <span>単語数:{palace.embededPins.length}</span>
      </div>
      <div className={styles.tag}>
        <GradeIcon className={styles.icon} />
        <span>保存者数:{palace.savedCount}</span>
      </div>
      <div className={styles.tag}>
        <ShareIcon className={styles.icon} />
        {share ? <span>共有済</span> : <span>未共有</span>}
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
          <button
            onClick={() => navigate('/fix/' + palace.id, {state: {shared: false, image: Extension(palace.image)}})}
            className={styles.menuButton}>
            <span className={styles.menuText}>宮殿の編集</span>
          </button>
          <div className={styles.divider} />
          <button onClick={() => setDeleteIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>宮殿の削除</span>
          </button>
          <Dialog open={deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
            <DialogTitle>本当に宮殿を削除しますか？</DialogTitle>
            <DialogActions>
              <button onClick={handleDelete} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setDeleteIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
          <div className={styles.divider} />
          <button onClick={() => setShareIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>宮殿の共有設定</span>
          </button>
          <Dialog open={shareIsOpen} onClose={() => setShareIsOpen(false)}>
            <DialogTitle>{share ? '宮殿の共有をやめますか？' : '宮殿を共有しますか？'}</DialogTitle>
            <DialogActions>
              <button onClick={handleShare} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setShareIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
          <div className={styles.divider} />
          <button onClick={() => setSaveAsTemplateIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>テンプレートとして保存</span>
          </button>
          <Dialog open={saveAsTemplateIsOpen} onClose={() => setSaveAsTemplateIsOpen(false)}>
            <DialogTitle>本当にテンプレートとして保存しますか？</DialogTitle>
            <DialogActions>
              <button onClick={handleSaveAsTemplate} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setSaveAsTemplateIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </Menu>
    </div>
  )
}

export default Palace
