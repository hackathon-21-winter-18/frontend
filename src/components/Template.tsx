import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Template.module.css'
import ReactModal from 'react-modal'
import {TemplateType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'

interface TemplateProps {
  num: number
  template: TemplateType
  deleteTemplate: (number: number) => void
}

const Template: React.VFC<TemplateProps> = ({num, template, deleteTemplate}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [shareIsOpen, setShareIsOpen] = useState(false)
  const [share, setShare] = useState(template.share)
  const navigate = useNavigate()

  function handleDeleteDialog() {
    setDeleteIsOpen(true)
  }
  function handleShareDialog() {
    setShareIsOpen(true)
  }
  function handleDelete() {
    axios.delete('https://hackathon-21-winter-18.trap.show/backend/api/templates/share/' + template.id, {withCredentials: true})
    deleteTemplate(num)
  }
  function handleShare() {
    axios.put(
      'https://hackathon-21-winter-18.trap.show/backend/api/templates/share/' + template.id,
      {share: !template.share},
      {withCredentials: true}
    )
    setShare(!share)
    setShareIsOpen(false)
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
    <div className={styles.template}>
      {/* <Link to={'/memorize/' + palace.id} className={styles.image}>
        <img src={palace.image} alt={palace.name} />
      </Link> */}
      <img
        className={styles.image}
        src={Extension()}
        alt={template.name}
        onClick={() => navigate('/fromTemplate/' + template.id, {state: {image: Extension(), shared: true}})}
      />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{template.name}</h1>
        <button className={styles.moreVertIcon} onClick={() => setIsOpen(true)}>
          <MoreVertIcon />
        </button>
      </div>
      <div className={styles.wordTag}>
        <CommentIcon className={styles.commentIcon} />
        {template.pins.length + ' Pins'}
      </div>
      {share ? <span>共有済</span> : <span>未共有</span>}
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <button onClick={() => navigate('/fixTemplate/' + template.id, {state: {image: Extension()}})}>
          テンプレートの編集
        </button>
        <button onClick={handleDeleteDialog}>テンプレートの削除</button>
        <Dialog open={deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
          本当にテンプレートを削除しますか？
          <button onClick={handleDelete}>はい</button>
          <button onClick={() => setDeleteIsOpen(false)}>いいえ</button>
        </Dialog>
        <button onClick={handleShareDialog}>テンプレートの共有設定</button>
        <Dialog open={shareIsOpen} onClose={() => setShareIsOpen(false)}>
          {share ? 'テンプレートを未共有にしますか？' : 'テンプレートを共有しますか？'}
          <button onClick={handleShare}>はい</button>
          <button onClick={() => setShareIsOpen(false)}>いいえ</button>
        </Dialog>
      </Dialog>
    </div>
  )
}

export default Template
