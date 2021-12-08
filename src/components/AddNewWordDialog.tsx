import { Button, Dialog, Input } from '@mui/material';
import * as React from 'react';

interface AddNewWordDialogProps {
  open: boolean;
  handleClose: () => void;
  handleClick: () => void;
  newWord: string;
  setNewWord: React.Dispatch<React.SetStateAction<string>>;
  newMemo: string;
  setNewMemo: React.Dispatch<React.SetStateAction<string>>;
}
export default function AddNewWordDialog(props: AddNewWordDialogProps) {
  const { open, handleClose, handleClick, newWord, setNewWord, newMemo, setNewMemo } = props;
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewWord(e.target.value);
  }
  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMemo(e.target.value);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        単語
      </div>
      <div>
        <Input type="text" value={newWord} onChange={handleWordChange}></Input>
      </div>
      <div>
        説明
      </div>
      <div>
        <Input type="text" value={newMemo} onChange={handleMemoChange}></Input>
      </div>
      <Button onClick={handleClick}>登録</Button>
    </Dialog>
  )
}