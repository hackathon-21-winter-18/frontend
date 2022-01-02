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
import {Menu} from '@mui/material'

interface TemplateProps {
  num: number
  template: TemplateType
  handleDeleteTemplate: (number: number) => void
}

const Template: React.VFC<TemplateProps> = ({num, template, handleDeleteTemplate}) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [shareIsOpen, setShareIsOpen] = useState(false)
  const [share, setShare] = useState(template.share)
  const navigate = useNavigate()
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleDelete() {
    deleteTemplate(template.id)
    handleDeleteTemplate(num)
  }
  function handleShare() {
    putShareTemplate(template.id, !template.share)
    setShare(!share)
    setShareIsOpen(false)
    handleClose()
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
    <div className={styles.template}>
      {/* <Link to={'/memorize/' + palace.id} className={styles.image}>
        <img src={palace.image} alt={palace.name} />
      </Link> */}
      <img className={styles.image} src={Extension()} alt={template.name} onClick={() => setConfirmIsOpen(true)} />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{template.name}</h1>
        <button className={styles.moreVertIcon} onClick={handleClick}>
          <MoreVertIcon />
        </button>
      </div>
      <div className={styles.tag}>
        <CommentIcon className={styles.icon} />
        ピンの数:{template.pins.length}
      </div>
      <div className={styles.tag}>
        <GradeIcon className={styles.icon} />
        <span>保存者数:{template.savedCount}</span>
      </div>
      <div className={styles.tag}>
        <ShareIcon className={styles.icon} />
        {share ? <span>共有済</span> : <span>未共有</span>}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={styles.menu}>
        <div className={styles.card}>
          <button
            onClick={() => navigate('/fixTemplate/' + template.id, {state: {image: Extension()}})}
            className={styles.menuButton}>
            <span className={styles.menuText}>テンプレートの編集</span>
          </button>
          <div className={styles.divider} />
          <button onClick={() => setDeleteIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>テンプレートの削除</span>
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
          <div className={styles.divider} />
          <button onClick={() => setShareIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>テンプレートの共有設定</span>
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
      </Menu>
    </div>
  )
}

export default Template
