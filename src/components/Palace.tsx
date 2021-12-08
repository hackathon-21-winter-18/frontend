import {useState} from 'react'
import {Link} from 'react-router-dom'
import styles from './Palace.module.css'
import ReactModal from 'react-modal'
import {PalaceType} from '../types'
import axios from 'axios'

interface PalaceProps {
  palace: PalaceType
}

const Palace: React.VFC<PalaceProps> = ({palace}) => {
  const [isOpen, setIsOpen] = useState(false)
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
    axios.delete('http://localhost:8080//palace/' + palace.id)
  }

  return (
    <div>
      <Link to={'/memorize/' + palace.id}>
        <img src={palace.image} alt={palace.name} width="20%" />
      </Link>
      <br />
      <span>{palace.name}</span>
      <span>単語数:{palace.embededPins.length}</span>
      <button onClick={() => setIsOpen(true)}>︙</button>
      <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <Link to="/palaceEdit">宮殿の編集</Link>
        <br />
        <button onClick={handleDelete}>宮殿の削除</button>
      </ReactModal>
    </div>
  )
}

export default Palace
