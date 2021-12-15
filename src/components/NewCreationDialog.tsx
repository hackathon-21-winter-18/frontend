import React, {useRef, useState} from 'react'
import styles from './NewCreationDialog.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import DeleteIcon from '@mui/icons-material/Delete'
import {IconButton} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {getBase64} from '../util/convert'

type CreationMode = 'general' | 'createPalace' | 'createTemplate'

interface NewCreationDialogProps {
  onClose: () => void
}

const NewCreationDialog: React.VFC<NewCreationDialogProps> = ({onClose}) => {
  const [mode, setMode] = useState<CreationMode>('general')
  const [image, setImage] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0])
  }

  const handleUploadFile = async () => {
    if (image) {
      const base64 = await getBase64(image)
      navigate('/edit/' + base64.substring(27, 100), {replace: true, state: {image: base64}})
    }
    onClose()
  }
  const handleUploadTemplateFile = async () => {
    if (image) {
      const base64 = await getBase64(image)
      navigate('/editTemplate/' + base64.substring(27, 100), {replace: true, state: {image: base64}})
    }
    onClose()
  }

  return (
    <>
      {mode === 'general' && (
        <div className={styles.dialog}>
          <h1>新規作成</h1>
          <div className={styles.divider} />
          <p>作成方法を選んでください。既存の宮殿から作成することも可能です。</p>
          <div className={styles.container}>
            <div className={styles.buttonContainer}>
              <button onClick={() => setMode('createPalace')}>画像をアップロードして作成</button>
              <button onClick={() => setMode('createTemplate')}>テンプレートを作成</button>
            </div>
            <img src="" alt="" />
          </div>
        </div>
      )}
      {mode === 'createPalace' && (
        <div className={styles.dialog}>
          <h1>
            <span onClick={() => setMode('general')}>
              {'新規作成 '}
              <ArrowRightIcon />{' '}
            </span>
            画像をアップロードして作成
          </h1>
          <div className={styles.divider} />
          <p>家の間取りをアップロードしてあなたの宮殿を作成しましょう</p>
          <div className={styles.uploadContainer}>
            {image ? (
              <div className={styles.imageList}>
                <IconButton onClick={() => setImage(null)}>
                  <DeleteIcon className={styles.deleteIcon} />
                </IconButton>
                <img src={window.URL.createObjectURL(image)} alt="" />
                {image.name}
                <button className={styles.createButton} onClick={handleUploadFile}>
                  作成
                </button>
              </div>
            ) : (
              <>
                <input
                  id="contained-button-file"
                  type="file"
                  accept="image/*"
                  style={{display: 'none'}}
                  onChange={handleChangeFile}
                  ref={inputRef}
                />
                <button className={styles.uploadButton} onClick={() => inputRef.current?.click()}>
                  画像をアップロードする
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {mode === 'createTemplate' && (
        <div className={styles.dialog}>
          <h1>
            <span onClick={() => setMode('general')}>
              {'新規作成 '}
              <ArrowRightIcon />{' '}
            </span>
            テンプレートを作成
          </h1>
          <div className={styles.divider} />
          <p>家の間取りをアップロードしてあなたのテンプレートを作成しましょう</p>
          <div className={styles.uploadContainer}>
            {image ? (
              <div className={styles.imageList}>
                <IconButton onClick={() => setImage(null)}>
                  <DeleteIcon className={styles.deleteIcon} />
                </IconButton>
                <img src={window.URL.createObjectURL(image)} alt="" />
                {image.name}
                <button className={styles.createButton} onClick={handleUploadTemplateFile}>
                  作成
                </button>
              </div>
            ) : (
              <>
                <input
                  id="contained-button-file"
                  type="file"
                  accept="image/*"
                  style={{display: 'none'}}
                  onChange={handleChangeFile}
                  ref={inputRef}
                />
                <button className={styles.uploadButton} onClick={() => inputRef.current?.click()}>
                  画像をアップロードする
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default NewCreationDialog
