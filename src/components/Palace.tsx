import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Palace.module.css'
import ReactModal from 'react-modal'
import {PalaceType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'

interface PalaceProps {
  palace: PalaceType
}

const Palace: React.VFC<PalaceProps> = ({palace}) => {
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
    axios.delete('/palace/' + palace.id)
  }

  return (
    <div className={styles.palace}>
      {/* <Link to={'/memorize/' + palace.id} className={styles.image}>
        <img src={palace.image} alt={palace.name} />
      </Link> */}
      <img
        className={styles.image}
        src={palace.image}
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
        <Link to="/palaceEdit">宮殿の編集</Link>
        <br />
        <button onClick={handleDelete}>宮殿の削除</button>
      </ReactModal>
    </div>
  )
}

export default Palace
