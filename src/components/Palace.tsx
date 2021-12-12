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
  const navigate = useNavigate()

  function handleDeleteDialog() {
    setDeleteIsOpen(true)
  }
  function handleDelete() {
    axios.delete('https://hackathon-21-winter-18.trap.show/backend/' + palace.id, {withCredentials: true})
    deletePalace(num)
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
        onClick={() => navigate('/memorize/' + palace.id)}
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
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <Link to={'fix/' + palace.id} state={{image: 'data:image/png;base64,' + palace.image}}>
          宮殿の編集
        </Link>
        <button onClick={handleDeleteDialog}>宮殿の削除</button>
        <Dialog open={deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
          本当に宮殿を削除しますか？
          <button onClick={handleDelete}>はい</button>
          <button onClick={() => setDeleteIsOpen(false)}>いいえ</button>
        </Dialog>
      </Dialog>
    </div>
  )
}

export default Palace
