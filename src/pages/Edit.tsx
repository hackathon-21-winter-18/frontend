import { Button, Dialog, Input } from '@mui/material';
import * as React from 'react';
import noumiso from "../assets/脳みそ.png"
export default function Edit() {
  const [open, setOpen] = React.useState(false);
  const [newWord, setNewWord] = React.useState('');
  const [words, setWords] = React.useState(new Array<string>());
  const [coodinate, setCoodinate] = React.useState([0, 0]);

  const handleOnClick = (e: any) => {
    setCoodinate([e.pageX, e.pageY]);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setNewWord('');
  }
  const handleClick = () => {
    setWords([...words, `(${newWord},${coodinate[0]},${coodinate[1]})`]);
    setOpen(false);
    setNewWord('');
  }
  return (
    <span>
      <div>
        <img src={noumiso} alt={"noumiso"} onClick={handleOnClick} />
      </div>
      <div>
        {words.map((word: string) => <Input value={word}></Input>)}
      </div>
      <AddNewWordDialog open={open} newWord={newWord} setNewWord={setNewWord} handleClose={handleClose} handleClick={handleClick} />
    </span>
  )
}
interface AddNewWordDialogProps {
  open: boolean;
  handleClose: () => void;
  handleClick: () => void;
  newWord: string;
  setNewWord: any;
}
function AddNewWordDialog(props: AddNewWordDialogProps) {
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