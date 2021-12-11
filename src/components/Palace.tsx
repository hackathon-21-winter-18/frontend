import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Palace.module.css'
import {PalaceType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'

interface PalaceProps {
  num: number
  palace: PalaceType
  deletePalace: (number: number) => void
}

const Palace: React.VFC<PalaceProps> = ({num, palace, deletePalace}) => {
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
    axios.delete('http://localhost:8080/api/palaces/' + palace.id, {withCredentials: true})
    deletePalace(num)
  }
  function handleShare() {
    axios.put('http://localhost:8080/api/share/' + palace.id, {share: !palace.share}, {withCredentials: true})
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
      {share ? <span>共有済</span> : <span>未共有</span>}
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <Link to={'fix/' + palace.id} state={{image: Extension()}}>
          宮殿の編集
        </Link>
        <button onClick={handleDeleteDialog}>宮殿の削除</button>
        <Dialog open={deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
          本当に宮殿を削除しますか？
          <button onClick={handleDelete}>はい</button>
          <button onClick={() => setDeleteIsOpen(false)}>いいえ</button>
        </Dialog>
        <button onClick={handleShareDialog}>宮殿の共有設定</button>
        <Dialog open={shareIsOpen} onClose={() => setShareIsOpen(false)}>
          {share ? '宮殿を未共有にしますか？' : '宮殿を共有しますか？'}
          <button onClick={handleShare}>はい</button>
          <button onClick={() => setShareIsOpen(false)}>いいえ</button>
        </Dialog>
      </Dialog>
    </div>
  )
}

export default Palace
