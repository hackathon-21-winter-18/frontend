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

  function handleShare() {
    putShareTemplate(template.id, false)
    handleDeleteTemplate(num)
    setShareIsOpen(false)
    setIsOpen(false)
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
      <img className={styles.image} src={Extension()} alt={template.name} onClick={() => setConfirmIsOpen(true)} />
      {/*stateによって変える*/}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{template.name}</h1>
        <button className={styles.moreVertIcon} onClick={() => setIsOpen(true)}>
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

      <Dialog open={isOpen && !(template.createrName === user.name)} onClose={handleDialogClose}>
        <DialogActions>
          <button onClick={() => setSaveIsOpen(true)} className={styles.button1}>
            テンプレートの保存
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
        </DialogActions>
      </Dialog>
      <Dialog open={isOpen && template.createrName === user.name} onClose={handleDialogClose}>
        <DialogActions>
          <button onClick={() => setShareIsOpen(true)} className={styles.button2}>
            テンプレートの共有設定
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
        </DialogActions>
      </Dialog>
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
