import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './SharedPalace.module.css'
import {SharedPalaceType} from '../types'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'
import useAuth from '../components/UserProvider'
import {DialogActions, DialogTitle} from '@mui/material'
import {putSharePalace, postPalace} from '../api/palace'

interface PalaceProps {
  num: number
  palace: SharedPalaceType
  deletePalace: (number: number) => void
}

const SharedPalace: React.VFC<PalaceProps> = ({num, palace, deletePalace}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [saveIsOpen, setSaveIsOpen] = useState(false)
  const navigate = useNavigate()
  const {user} = useAuth()
  const [shareIsOpen, setShareIsOpen] = useState(false)

  function handleSaveDialog() {
    setSaveIsOpen(true)
  }
  function handleShareDialog() {
    setShareIsOpen(true)
  }
  function handleShare() {
    putSharePalace(palace.id, false)
    deletePalace(num)
    setShareIsOpen(false)
    setIsOpen(false)
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
    <div className={styles.sharedPalace}>
      {/* <Link to={'/memorize/' + palace.id} className={styles.image}>
        <img src={palace.image} alt={palace.name} />
      </Link> */}
      <img
        className={styles.image}
        src={Extension()}
        alt={palace.name}
        onClick={() => navigate('/memorize/' + palace.id, {state: {shared: true}})}
      />
      {/*stateによって変える*/}
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
        <span>作成者:{palace.createdBy}</span>
      </div>
      <div>
        <span>保存者数:{palace.savedCount}</span>
      </div>

      <Dialog open={isOpen && !(palace.createdBy === user.name)} onClose={handleDialogClose}>
        <DialogActions>
          <button onClick={handleSaveDialog} className={styles.button1}>
            宮殿の保存
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
        </DialogActions>
      </Dialog>
      <Dialog open={isOpen && palace.createdBy === user.name} onClose={handleDialogClose}>
        <DialogActions>
          <button onClick={handleShareDialog} className={styles.button2}>
            宮殿の共有設定
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
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SharedPalace
