import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Palace.module.css'
import {PalaceType} from '../types'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {deletePalace, putSharePalace} from '../api/palace'

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
  const navigate = useNavigate()

  function handleDeleteDialog() {
    setDeleteIsOpen(true)
  }
  function handleShareDialog() {
    setShareIsOpen(true)
  }
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
      <img
        className={styles.image}
        src={Extension()}
        alt={palace.name}
        onClick={() => navigate('/memorize/' + palace.id, {state: {shared: false}})}
      />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{palace.name}</h1>
        <button className={styles.moreVertIcon} onClick={() => setIsOpen(true)}>
          <MoreVertIcon />
        </button>
      </div>
      <div className={styles.wordTag}>
        <CommentIcon className={styles.commentIcon} />
        {palace.embededPins.length + ' Words'}
      </div>
      <div>
        <span>保存者数:{palace.savedCount}</span>
      </div>
      {share ? <span>共有済</span> : <span>未共有</span>}

      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogActions>
          <button className={styles.button2}>
            <Link
              to={'/fix/' + palace.id}
              state={{image: Extension()}}
              style={{textDecoration: 'none', color: '#7a8498'}}>
              宮殿の編集
            </Link>
          </button>
        </DialogActions>
        <DialogActions>
          <button onClick={handleDeleteDialog} className={styles.button2}>
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
          <button onClick={handleShareDialog} className={styles.button2}>
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
      </Dialog>
    </div>
  )
}

export default Palace
