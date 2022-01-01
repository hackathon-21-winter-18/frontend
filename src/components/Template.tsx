import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Template.module.css'
import {TemplateType} from '../types'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import GradeIcon from '@mui/icons-material/Grade'
import ShareIcon from '@mui/icons-material/Share'
import {deleteTemplate, putShareTemplate} from '../api/template'

interface TemplateProps {
  num: number
  template: TemplateType
  handleDeleteTemplate: (number: number) => void
}

const Template: React.VFC<TemplateProps> = ({num, template, handleDeleteTemplate}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [shareIsOpen, setShareIsOpen] = useState(false)
  const [share, setShare] = useState(template.share)
  const navigate = useNavigate()
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)

  function handleDeleteDialog() {
    setDeleteIsOpen(true)
  }
  function handleShareDialog() {
    setShareIsOpen(true)
  }
  function handleDelete() {
    deleteTemplate(template.id)
    handleDeleteTemplate(num)
  }
  function handleShare() {
    putShareTemplate(template.id, !template.share)
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
      <img className={styles.image} src={Extension()} alt={template.name} onClick={() => setConfirmIsOpen(true)} />
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
      <div className={styles.tag}>
        <GradeIcon className={styles.icon} />
        <span>保存者数:{template.savedCount}</span>
      </div>
      <div className={styles.tag}>
        <ShareIcon className={styles.icon} />
        {share ? <span>共有済</span> : <span>未共有</span>}
      </div>

      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        PaperProps={{style: {width: '381px', height: '309px', borderRadius: '10px'}}}>
        <DialogActions>
          <button
            onClick={() => navigate('/fixTemplate/' + template.id, {state: {image: Extension()}})}
            className={styles.button2}>
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
            テンプレートの共有設定
          </button>
          <Dialog open={shareIsOpen} onClose={() => setShareIsOpen(false)}>
            <DialogTitle>{share ? 'テンプレートの共有をやめますか？' : 'テンプレートを共有しますか？'}</DialogTitle>
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
      <Dialog open={confirmIsOpen} onClose={() => setConfirmIsOpen(false)}>
        <DialogTitle>このテンプレートから宮殿を作成しますか？</DialogTitle>
        <DialogActions>
          <button
            onClick={() => navigate('/fromTemplate/' + template.id, {state: {image: Extension(), shared: false}})}
            className={styles.button1}>
            はい
          </button>
          <button onClick={() => setConfirmIsOpen(false)} className={styles.button2}>
            いいえ
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Template
