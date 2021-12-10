import { Button, Input } from '@mui/material'
import * as React from 'react'

export interface EditAddedWordProps {
  word: string
  place: string
  condition: string
  handleWordChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handlePlaceChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleConditionChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleDelete: React.MouseEventHandler<HTMLButtonElement>
}
export const EditAddedWord: React.VFC<EditAddedWordProps> = (props: EditAddedWordProps) => {
  const { word, place, condition, handleWordChange, handlePlaceChange, handleConditionChange, handleDelete } = props
  return (
    <div>
      <Input value={word} onChange={handleWordChange} />
      <span>が</span>
      <Input value={place} onChange={handlePlaceChange} />
      <span>で</span>
      <Input value={condition} onChange={handleConditionChange} />
      <Button onClick={handleDelete}>削除</Button>
    </div >
  )
}
