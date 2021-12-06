import * as React from 'react';
import noumiso from "../assets/脳みそ.png"
import AddNewWordDialog from "../components/AddNewWordDialog"
import EditAddedWord from '../components/EditAddedWord';
import PushPinIcon from '@mui/icons-material/PushPin';
export default function Edit() {
  const [open, setOpen] = React.useState(false);
  const [newWord, setNewWord] = React.useState('');
  const [newCoodinate, setNewCoodinate]: [[number, number], any] = React.useState([0, 0]);
  const [words, setWords] = React.useState(new Array<string>());
  const [coodinates, setCoodinates] = React.useState(new Array<[number, number]>());

  const handleOnClick = (e: any) => {
    setNewCoodinate([e.pageX, e.pageY]);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setNewWord('');
  }
  const handleClick = () => {
    setWords([...words, newWord]);
    setCoodinates([...coodinates, newCoodinate]);
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
    const _coodinates = coodinates.slice();
    _words.splice(index, 1);
    setCoodinates([..._coodinates]);
  }
  return (
    <span>
      {coodinates.map(([x, y]: [number, number]) => <PushPinIcon style={{ position: 'absolute', top: y + 'px', left: x + 'px' }} />)}
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
