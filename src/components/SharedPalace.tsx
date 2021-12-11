import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Palace.module.css'
import {SharedPalaceType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'

interface PalaceProps {
  palace: SharedPalaceType
}

const SharedPalace: React.VFC<PalaceProps> = ({palace}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const navigate = useNavigate()

  function handleSaveDialog() {
    setDeleteIsOpen(true)
  }
  function handleSave() {
    const data = {
      id: palace.id,
      name: palace.name,
      image: palace.image,
      embededPins: palace.embededPins,
    }
    axios.post('http://localhost:8080/api/palaces', data, {withCredentials: true})
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
        <span>{palace.savedCount}</span>
      </div>
      <div>
        <span>{palace.createrName}</span>
      </div>
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <button onClick={handleSaveDialog}>宮殿の保存</button>
        <Dialog open={deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
          本当に宮殿を保存しますか？
          <button onClick={handleSave}>はい</button>
          <button onClick={() => setDeleteIsOpen(false)}>いいえ</button>
        </Dialog>
      </Dialog>
    </div>
  )
}

export default SharedPalace
