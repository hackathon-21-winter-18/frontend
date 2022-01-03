import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

export interface FromNewTemplateDialogProps {
  open: boolean
  previewImg: string
  onClose: () => void
  setPreviewImg: React.Dispatch<React.SetStateAction<string>>
}

function FromNewTemplateDialog(props: FromNewTemplateDialogProps) {
  const {open, onClose, previewImg, setPreviewImg} = props
  const handleClose = () => {
    onClose()
  }
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        setPreviewImg(ev.target?.result?.toString()!)
      }
      reader.readAsDataURL(file)
    }
  }
  let navigate = useNavigate()
  function handleNavigate() {
    onClose()
    navigate('/editTemplate/' + previewImg.substring(27, 100), {state: {image: previewImg}})
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        <h1>新規作成</h1>
      </div>
      <div>
        <label htmlFor="contained-button-file">
          <input
            type="file"
            accept="image/*"
            id="contained-button-file"
            style={{display: 'none'}}
            onChange={handleChangeFile}
          />
          <Button variant="contained" component="span">
            画像をアップロード
          </Button>
        </label>
      </div>

      {previewImg.length !== 0 && (
        <div>
          <div>
            <img src={previewImg} alt="previewImage" id="id" />
          </div>
          <div>
            <button onClick={handleNavigate}>次に進む</button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
export default function FromNewTemplate() {
  const [open, setOpen] = React.useState(false)
  const [previewImg, setPreviewImg] = React.useState('')
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setPreviewImg('')
  }
  return (
    <span>
      <Button variant="outlined" onClick={handleClickOpen}>
        新規画像から(template)
      </Button>
      <FromNewTemplateDialog open={open} onClose={handleClose} previewImg={previewImg} setPreviewImg={setPreviewImg} />
    </span>
  )
}
