import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Palace.module.css'
import ReactModal from 'react-modal'
import {TemplateType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'

interface TemplateProps {
  num: number
  template: TemplateType
  deleteTemplate: (number: number) => void
}

const Template: React.VFC<TemplateProps> = ({num, template, deleteTemplate}) => {
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
    axios.delete('http://localhost:8080/api/templates/' + template.id, {withCredentials: true})
    deleteTemplate(num)
  }
  function Extension() {
    switch (template.image.substring(0, 5)) {
      case 'iVBOR':
        return 'data:image/png;base64,' + template.image
      case 'R0IGO':
        return 'data:image/gif;base64,' + template.image
      case '/9j/4':
        return 'data:image/jpeg;base64,' + template.image
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
        alt={template.name}
        onClick={() => navigate('/fromTemplate' + template.id)}
      />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{template.name}</h1>
        <button className={styles.moreVertIcon} onClick={() => setIsOpen(true)}>
          <MoreVertIcon />
        </button>
      </div>
      <div className={styles.wordTag}>
        <CommentIcon className={styles.commentIcon} />
        {template.pins.length + ' Words'}
      </div>
      <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <Link to={'fixTemplate/' + template.id} state={{image: Extension()}}>
          宮殿の編集
        </Link>
        <br />
        <button onClick={handleDelete}>宮殿の削除</button>
      </ReactModal>
    </div>
  )
}

export default Template
