import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './SharedTemplate.module.css'
import {SharedTemplateType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'

interface TemplateProps {
  template: SharedTemplateType
}

const SharedTemplate: React.VFC<TemplateProps> = ({template}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const navigate = useNavigate()

  function handleSaveDialog() {
    setDeleteIsOpen(true)
  }
  function handleSave() {
    const data = {
      id: template.id,
      name: template.name,
      image: template.image,
      embededPins: template.pins,
    }
    axios.post('http://localhost:8080/api/templates', data, {withCredentials: true})
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
  const handleDialogClose = () => {
    setIsOpen(false)
  }
  return (
    <div className={styles.template}>
      {/* <Link to={'/memorize/' + template.id} className={styles.image}>
        <img src={template.image} alt={template.name} />
      </Link> */}
      <img
        className={styles.image}
        src={Extension()}
        alt={template.name}
        onClick={() => navigate('/memorize/' + template.id, {state: {shared: true}})}
      />
      {/*stateによって変える*/}
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
      <div>
        <span>{template.savedCount}</span>
      </div>
      <div>
        <span>{template.createrName}</span>
      </div>
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <button onClick={handleSaveDialog}>テンプレートの保存</button>
        <Dialog open={deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
          本当にテンプレートを保存しますか？
          <button onClick={handleSave}>はい</button>
          <button onClick={() => setDeleteIsOpen(false)}>いいえ</button>
        </Dialog>
      </Dialog>
    </div>
  )
}

export default SharedTemplate
