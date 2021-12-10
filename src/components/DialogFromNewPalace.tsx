import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'
import NewCreationDialog from './NewCreationDialog'

export interface FromNewPalaceDialogProps {
  open: boolean
  previewImg: string
  onClose: () => void
  setPreviewImg: React.Dispatch<React.SetStateAction<string>>
}

function FromNewPalaceDialog(props: FromNewPalaceDialogProps) {
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <NewCreationDialog />
    </Dialog>
  )
}
export default function FromNewPalace() {
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
        新規画像から
      </Button>
      <FromNewPalaceDialog open={open} onClose={handleClose} previewImg={previewImg} setPreviewImg={setPreviewImg} />
    </span>
  )
}
