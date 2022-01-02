import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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

interface PalaceProps {
  num: number
  palace: PalaceType
  handleDeletePalace: (number: number) => void
}

const Palace: React.VFC<PalaceProps> = ({num, palace, handleDeletePalace}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [shareIsOpen, setShareIsOpen] = useState(false)
  const [share, setShare] = useState(palace.share)
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [saveAsTemplateIsOpen, setSaveAsTemplateIsOpen] = useState(false)
  const navigate = useNavigate()
  const {user} = userAuth()

  function handleDelete() {
    deletePalace(palace.id)
    handleDeletePalace(num)
  }
  function handleShare() {
    putSharePalace(palace.id, !palace.share)
    setShare(!share)
    setShareIsOpen(false)
    setIsOpen(false)
  }
  function handleSaveAsTemplate() {
    let templatePins = new Array<Pin>()
    for (let i = 0; i < templatePins.length; i++) {
      templatePins.push({
        number: i,
        x: palace.embededPins[i].x,
        y: palace.embededPins[i].y,
      })
    }
    const data = {
      name: palace.name,
      image: palace.image,
      pins: palace.embededPins,
      createdBy: palace.createdBy,
    }
    postTemplate(data, () => setSaveAsTemplateIsOpen(false))
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
  const handleDialogClose = () => {
    setIsOpen(false)
  }
  return (
    <div className={styles.palace}>
      {/* <Link to={'/memorize/' + palace.id} className={styles.image}>
        <img src={palace.image} alt={palace.name} />
      </Link> */}
      <img className={styles.image} src={Extension()} alt={palace.name} onClick={() => setConfirmIsOpen(true)} />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{palace.name}</h1>
        <button className={styles.moreVertIcon} onClick={() => setIsOpen(true)}>
          <MoreVertIcon />
        </button>
      </div>
      <div className={styles.tag}>
        <CommentIcon className={styles.icon} />
        単語数:{palace.embededPins.length}
      </div>
      <div className={styles.tag}>
        <GradeIcon className={styles.icon} />
        <span>保存者数:{palace.savedCount}</span>
      </div>
      <div className={styles.tag}>
        <ShareIcon className={styles.icon} />
        {share ? <span>共有済</span> : <span>未共有</span>}
      </div>

      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogActions>
          <button
            onClick={() => navigate('/fix/' + palace.id, {state: {shared: false, image: Extension()}})}
            className={styles.button2}>
            宮殿の編集
          </button>
        </DialogActions>
        <DialogActions>
          <button onClick={() => setDeleteIsOpen(true)} className={styles.button2}>
            宮殿の削除
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
        </DialogActions>
        <DialogActions>
          <button onClick={() => setShareIsOpen(true)} className={styles.button2}>
            宮殿の共有設定
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
        </DialogActions>
        <DialogActions>
          <button onClick={() => setSaveAsTemplateIsOpen(true)} className={styles.button2}>
            テンプレートとして保存
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
  )
}

export default Palace
