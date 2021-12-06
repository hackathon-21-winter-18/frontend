import { Input } from '@mui/material';
import * as React from 'react';
import noumiso from "../assets/脳みそ.png"
import AddNewWordDialog from "../components/AddNewWordDialog"
import EditAddedWord from '../components/EditAddedWord';
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
  const handleChange = (e: any, index: number) => {
    const _words = words.slice();
    _words[index] = e.target.value;
    setWords([..._words]);
  }
  const handleDelete = (index: number) => {
    const _words = words.slice();
    _words.splice(index, 1);
    setWords([..._words]);
  }
  return (
    <span>
      <Icon ></Icon>
      <div>
        <img src={noumiso} alt={"noumiso"} onClick={handleOnClick} />
      </div>
      <div>
        {words.map((word: string, index: number) => <div><EditAddedWord word={word} handleChange={(e: any) => handleChange(e, index)} handleDelete={() => handleDelete(index)} /></div>)}
      </div>
      <AddNewWordDialog open={open} newWord={newWord} setNewWord={setNewWord} handleClose={handleClose} handleClick={handleClick} />
    </span>
  )
}
