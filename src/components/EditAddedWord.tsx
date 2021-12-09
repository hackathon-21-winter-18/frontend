import {Button, Input} from '@mui/material'
import * as React from 'react'

export interface EditAddedWordProps {
  word: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleDelete: React.MouseEventHandler<HTMLButtonElement>
}
export const EditAddedWord: React.VFC<EditAddedWordProps> = (props: EditAddedWordProps) => {
  const {word, handleChange, handleDelete} = props
  return (
    <div>
      <Input value={word} onChange={handleChange}></Input>
      <Button onClick={handleDelete}>削除</Button>
    </div>
  )
}
