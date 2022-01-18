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
import userAuth from '../components/UserProvider'
import {Menu} from '@mui/material'
import {Extension} from '../util/extension'

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
  const {user} = userAuth()
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
    const data = {
      share: !template.share,
      createdBy: template.createdBy,
    }
    putShareTemplate(template.id, data)
    setShare(!share)
    setShareIsOpen(false)
    handleClose()
  }

  return (
    <div className={styles.template}>
      <button
        onClick={() => navigate('/fromTemplate/' + template.id, {state: {shared: false}})}
        className={styles.imageButton}>
        <img className={styles.image} src={Extension(template.image)} alt={template.name} />
        <div>
          <span>テンプレートから宮殿を作成</span>
        </div>
      </button>
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
            onClick={() => navigate('/fixTemplate/' + template.id, {state: {image: Extension(template.image)}})}
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
        </div>
      </Menu>
    </div>
  )
}

export default Template
