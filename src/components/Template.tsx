import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Template.module.css'
import {TemplateType} from '../types'
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {config} from '../config'

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
    axios.delete(config() + '/api/templates/share/' + template.id, {withCredentials: true})
    deleteTemplate(num)
  }
  function handleShare() {
    axios.put(config() + '/api/templates/share/' + template.id, {share: !template.share}, {withCredentials: true})
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
        {template.pins.length + ' pins'}
      </div>
      <div>
        <span>{template.savedCount}回保存されました</span>
      </div>
      {share ? <span>共有済</span> : <span>未共有</span>}

      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogActions>
          <button
            onClick={() => navigate('/fixTemplate/' + template.id, {state: {image: Extension()}})}
            style={{textDecoration: 'none', color: '#7a8498'}}>
            テンプレートの編集
          </button>
        </DialogActions>

        <DialogActions>
          <button onClick={handleDeleteDialog} className={styles.button2}>
            テンプレートの削除
          </button>
          <Dialog open={deleteIsOpen} onClose={() => setDeleteIsOpen(false)}>
            <DialogTitle>本当にテンプレートを削除しますか？</DialogTitle>
            <DialogActions>
              <button onClick={handleDelete} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setDeleteIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
        </DialogActions>
        <DialogActions>
          <button onClick={handleShareDialog} className={styles.button2}>
            宮殿の共有設定
          </button>
          <Dialog open={shareIsOpen} onClose={() => setShareIsOpen(false)}>
            <DialogTitle>{share ? 'テンプレートを未共有にしますか？' : 'テンプレートを共有しますか？'}</DialogTitle>
            <DialogActions>
              <button onClick={handleShare} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setShareIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Template
