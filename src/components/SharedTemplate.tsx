import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './SharedTemplate.module.css'
import {SharedTemplateType} from '../types'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentIcon from '@mui/icons-material/Comment'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import GradeIcon from '@mui/icons-material/Grade'
import Dialog from '@mui/material/Dialog'
import useAuth from '../components/UserProvider'
import {DialogActions, DialogTitle} from '@mui/material'
import {putShareTemplate, postTemplate} from '../api/template'
import {Menu} from '@mui/material'

interface TemplateProps {
  num: number
  template: SharedTemplateType
  handleDeleteTemplate: (number: number) => void
}

const SharedTemplate: React.VFC<TemplateProps> = ({num, template, handleDeleteTemplate}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [saveIsOpen, setSaveIsOpen] = useState(false)
  const navigate = useNavigate()
  const {user} = useAuth()
  const [shareIsOpen, setShareIsOpen] = useState(false)
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleShare() {
    putShareTemplate(template.id, false)
    handleDeleteTemplate(num)
    setShareIsOpen(false)
    handleClose()
  }
  function handleSave() {
    const data = {
      name: template.name,
      image: template.image,
      pins: template.pins,
      createdBy: template.createdBy,
      originalID: template.id,
    }
    postTemplate(data)
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
    <div className={styles.sharedTemplate}>
      {/* <Link to={'/memorize/' + template.id} className={styles.image}>
        <img src={template.image} alt={template.name} />
      </Link> */}
      <img className={styles.image} src={Extension()} alt={template.name} onClick={() => setConfirmIsOpen(true)} />
      {/*stateによって変える*/}
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
        <AccessibilityNewIcon className={styles.icon} />
        <span>作成者:{template.createrName}</span>
      </div>
      <div className={styles.tag}>
        <GradeIcon className={styles.icon} />
        <span>保存者数:{template.savedCount}</span>
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
          <button onClick={() => setSaveIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>テンプレートの保存</span>
          </button>
          <Dialog open={saveIsOpen} onClose={() => setSaveIsOpen(false)}>
            <DialogTitle>本当にテンプレートを保存しますか？</DialogTitle>
            <DialogActions>
              <button onClick={handleSave} className={styles.button1}>
                はい
              </button>
              <button onClick={() => setIsOpen(false)} className={styles.button2}>
                いいえ
              </button>
            </DialogActions>
          </Dialog>
          <div className={styles.divider} />
          <button onClick={() => setShareIsOpen(true)} className={styles.menuButton}>
            <span className={styles.menuText}>テンプレートの共有設定</span>
          </button>
          <Dialog open={shareIsOpen} onClose={() => setShareIsOpen(false)}>
            <DialogTitle>テンプレートの共有をやめますか？</DialogTitle>
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
      <Dialog open={confirmIsOpen} onClose={() => setConfirmIsOpen(false)}>
        <DialogTitle>このテンプレートから宮殿を作成しますか？</DialogTitle>
        <DialogActions>
          <button
            onClick={() => navigate('/fromTemplate/' + template.id, {state: {image: Extension(), shared: true}})}
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

export default SharedTemplate
