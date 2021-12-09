import * as React from "react"
import { useParams, useLocation } from "react-router"
import AddNewWordDialog from "../components/AddNewWordDialog"
import { EditAddedWord } from "../components/EditAddedWord"
import PushPinIcon from "@mui/icons-material/PushPin"
import { FinishEditButton } from "../components/FinishEditButton"
export const Edit: React.VFC = () => {
  const [open, setOpen] = React.useState(false)

  const [name, setName] = React.useState('')

  const [newWord, setNewWord] = React.useState('')
  const [newMemo, setNewMemo] = React.useState('')
  const [newCoodinate, setNewCoodinate] = React.useState<[number, number]>([
    0, 0,
  ])

  const [words, setWords] = React.useState(new Array<string>())
  const [memos, setMemos] = React.useState(new Array<string>())
  const [coodinates, setCoodinates] = React.useState(
    new Array<[number, number]>()
  )

  const image = useParams() //あとで使うかも
  const location = useLocation()

  const handleOnImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setNewCoodinate([e.pageX, e.pageY])
    setOpen(true)
  }
  const handleDialogClose = () => {
    setOpen(false)
    setNewWord("")
  }
  const handleDialogClick = () => {
    setWords([...words, newWord])
    setMemos([...memos, newMemo])
    setCoodinates([...coodinates, newCoodinate])
    setOpen(false)
    setNewWord("")
    setNewMemo("")
  }
  const handleWordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const _words = words.slice()
    _words[index] = e.target.value
    setWords([..._words])
  }
  const handleWordDelete = (index: number) => {
    const _words = words.slice()
    _words.splice(index, 1)
    setWords([..._words])
    const _coodinates = coodinates.slice()
    _coodinates.splice(index, 1)
    setCoodinates([..._coodinates])
  }
  function handleNameChange(e: any) {
    setName(e.target.value)
  }
  /*
  function handleComplete() {
    const embededPins = []
    for (let i = 0; i < embededPins.length; i++){
      embededPins.push({
        number: i,
        x:coodinates[i][0],
        y:coodinates[i][1],
        word: words[i],
        memo:""
      })
    }
    const data = {
      name: name,
      image: location.state.image,
      embededPins: embededPins,
      createdBy:userId,
    }
    axios.post("/palaces/me/" + userId, {}).then((res) => {
      //ダイアログ表示
    })
  }
  */
  /*{
  "name": "string",
  "image": "string",
  "embededPins": [
    {
      "number": 0,
      "x": 0,
      "y": 0,
      "word": "string",
      "memo": "string"
    }
  ],
  "createdBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}*/
  return (
    <div>
      {coodinates.map(([x, y]: [number, number], index) => (
        <PushPinIcon key={index} style={{ position: 'absolute', top: y + 'px', left: x + 'px' }} />
      ))}
      <div>
        <img src={location.state.image} alt="map" onClick={handleOnImageClick} />
      </div>
      <div>
        {words.map((word: string, index: number) => (
          <div>
            <EditAddedWord
              key={index}
              word={word}
              handleChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleWordChange(e, index)}
              handleDelete={() => handleWordDelete(index)}
            />
          </div>
        ))}
      </div>
      <AddNewWordDialog
        open={open}
        newWord={newWord}
        setNewWord={setNewWord}
        newMemo={newMemo}
        setNewMemo={setNewMemo}
        handleClose={handleDialogClose}
        handleClick={handleDialogClick}
      />
      {/*
			<input type="text" value={name} placeholder="神殿の名前" onChange={handleNameChange />}
			<button onClick={handleComplete}>完成！</button>
			*/}
    </div>
  )
}
