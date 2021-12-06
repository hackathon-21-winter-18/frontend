import { Button, Dialog, Input } from '@mui/material';
import * as React from 'react';

interface AddNewWordDialogProps {
  open: boolean;
  handleClose: () => void;
  handleClick: () => void;
  newWord: string;
  setNewWord: any;
}
export default function AddNewWordDialog(props: AddNewWordDialogProps) {
  const { open, handleClose, handleClick, newWord, setNewWord } = props;
  const handleChange = (e: any) => {
    setNewWord(e.target.value);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <div>
        単語
      </div>
      <div>
        <Input type="text" value={newWord} onChange={handleChange}></Input>
      </div>
      <div>
        説明
      </div>
      <div>
        <Input></Input>
      </div>
      <Button onClick={handleClick}>登録</Button>
    </Dialog>
  )
}