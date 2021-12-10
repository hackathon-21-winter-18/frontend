import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Palace.module.css'
import ReactModal from 'react-modal'
import {PalaceType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'

interface PalaceProps {
  num: number
  palace: PalaceType
  deletePalace: (number: number) => void
}

const Palace: React.VFC<PalaceProps> = ({num, palace, deletePalace}) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const customStyles: ReactModal.Styles = {
    // ダイアログ内のスタイル（中央に表示）
    content: {
      top: '30%',
      bottom: 'auto',
      right: 'auto',
      left: '50%',
    },
    // 親ウィンドウのスタイル
    overlay: {},
  }

  function handleDelete() {
    //確認ダイアログ表示
    axios
      .delete('http://localhost:8080/api/palaces/' + palace.id, {withCredentials: true})
      .catch((error) => navigate('/error', {state: error}))
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
      <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <Link to={'fix/' + palace.id} state={{image: 'data:image/png;base64,' + palace.image}}>
          宮殿の編集
        </Link>
        <br />
        <button onClick={handleDelete}>宮殿の削除</button>
      </ReactModal>
    </div>
  )
}

export default Palace
