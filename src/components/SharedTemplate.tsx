import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './SharedTemplate.module.css'
import {SharedTemplateType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'
import {UserContext} from '../components/UserProvider'

interface TemplateProps {
  template: SharedTemplateType
}

const SharedTemplate: React.VFC<TemplateProps> = ({template}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [saveIsOpen, setSaveIsOpen] = useState(false)
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  function handleSaveDialog() {
    setSaveIsOpen(true)
  }
  function handleSave() {
    const data = {
      id: template.id,
      name: template.name,
      image: template.image,
      pins: template.pins,
      createdBy: user.id,
    }
    axios.post('http://localhost:8080/api/templates/me', data, {withCredentials: true})
    setIsOpen(false)
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
    <div className={styles.sharedTemplate}>
      {/* <Link to={'/memorize/' + template.id} className={styles.image}>
        <img src={template.image} alt={template.name} />
      </Link> */}
      <img
        className={styles.image}
        src={Extension()}
        alt={template.name}
        onClick={() => navigate('/fromTemplate/' + template.id, {state: {image: Extension(), shared: true}})}
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
        {template.pins.length + ' pins'}
      </div>
      <div>
        <span>{template.savedCount}回保存されました</span>
      </div>
      <div>
        <span>Creater:{template.createrName}</span>
      </div>
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <button onClick={handleSaveDialog}>テンプレートの保存</button>
        <Dialog open={saveIsOpen} onClose={() => setSaveIsOpen(false)}>
          本当にテンプレートを保存しますか？
          <button onClick={handleSave}>はい</button>
          <button onClick={() => setIsOpen(false)}>いいえ</button>
        </Dialog>
      </Dialog>
    </div>
  )
}

export default SharedTemplate
