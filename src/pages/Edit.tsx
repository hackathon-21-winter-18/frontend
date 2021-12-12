import * as React from 'react'
import styles from './Edit.module.css'
import {useParams, useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import AddNewWordDialog from '../components/AddNewWordDialog'
import {EditAddedWord} from '../components/EditAddedWord'
import PushPinIcon from '@mui/icons-material/PushPin'
import axios from 'axios'
import {Pins} from '../types'
import useAuth from '../components/UserProvider'
import Dialog from '@mui/material/Dialog'

interface EditProps {
  imageUrl?: string
}

export const Edit: React.VFC<EditProps> = ({imageUrl}) => {
  const [open, setOpen] = React.useState(false)
  const [newWord, setNewWord] = React.useState('')
  const [words, setWords] = React.useState(new Array<string>())
  const [newPlace, setNewPlace] = React.useState('')
  const [places, setPlaces] = React.useState(new Array<string>())
  const [newCondition, setNewCondition] = React.useState('')
  const [conditions, setConditions] = React.useState(new Array<string>())
  const [newCoodinate, setNewCoodinate] = React.useState<[number, number]>([0, 0])
  const [coodinates, setCoodinates] = React.useState(new Array<[number, number]>())
  const image = useParams() //あとで使うかも
  const location = useLocation()
  const [name, setName] = React.useState('')
  const {user} = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const [shareOption, setShareOptin] = React.useState(false)
  const [templateOption, setTemplateOption] = React.useState(false)
  const [palaceId, setPalaceId] = React.useState('')
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)
  const [flags, setFlags] = React.useState(new Array<boolean>())

  const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setNewCoodinate([e.pageX, e.pageY])
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setNewWord('')
    setNewPlace('')
    setNewCondition('')
  }
  const handleClick = () => {
    setWords([...words, newWord])
    if (newWord !== '') {
      setFlags(flags.concat([true]))
    } else {
      setFlags(flags.concat([false]))
    }
    setPlaces([...places, newPlace])
    setConditions([...conditions, newCondition])
    setCoodinates([...coodinates, newCoodinate])
    setOpen(false)
    setNewWord('')
    setNewPlace('')
    setNewCondition('')
    setPlaces([...places, newPlace])
    setConditions([...conditions, newCondition])
  }
  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _words = words.slice()
    _words[index] = e.target.value
    setWords([..._words])
    if (_words[index] !== '') {
      setFlags(flags.map((flag, i) => (i === index ? true : flag)))
    } else {
      setFlags(flags.map((flag, i) => (i === index ? false : flag)))
    }
  }
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _places = places.slice()
    _places[index] = e.target.value
    setPlaces([..._places])
  }
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const _conditions = conditions.slice()
    _conditions[index] = e.target.value
    setConditions([..._conditions])
  }
  const handleDelete = (index: number) => {
    const _words = words.slice()
    _words.splice(index, 1)
    setWords([..._words])
    const _places = places.slice()
    _places.splice(index, 1)
    setPlaces([..._places])
    const _conditions = conditions.slice()
    _conditions.splice(index, 1)
    setConditions([..._conditions])
    const _coodinates = coodinates.slice()
    _coodinates.splice(index, 1)
    setCoodinates([..._coodinates])
  }
  function handleNameChange(e: any) {
    setName(e.target.value)
  }

  function handleComplete() {
    if (coodinates.length > 0 && name !== '' && flags.every((value) => value)) {
      const embededPins = []
      for (let i = 0; i < coodinates.length; i++) {
        embededPins.push({
          number: i,
          x: coodinates[i][0],
          y: coodinates[i][1],
          word: words[i],
          place: places[i],
          do: conditions[i],
        })
      }
      let data = {
        name: name,
        image: '',
        embededPins: embededPins,
        createdBy: user.id,
      }
      if (location.state.image.substr(0, 23) === 'data:image/jpeg;base64,') {
        data = {
          name: name,
          image: location.state.image.substr(23),
          embededPins: embededPins,
          createdBy: user.id,
        }
      } else {
        data = {
          name: name,
          image: location.state.image.substr(22),
          embededPins: embededPins,
          createdBy: user.id,
        }
      }
      console.log(data)
      axios
        .post('http://localhost:8080/api/palaces/me', data, {withCredentials: true})
        .then((res) => {
          console.log(res.status)
          const palaceId = res.data.id
          if (shareOption) {
            axios
              .put('http://localhost:8080/api/palaces/share/' + palaceId, {share: shareOption}, {withCredentials: true})
              .then((res) => console.log(res.status))
              .catch((error) => {
                console.log(error)
              })
          }
          console.log(res.data)
          setPalaceId(res.data.id)
        })
        .catch((error) => {
          console.log(error)
        })
      if (templateOption) {
        let pins = new Array<Pins>()
        for (let i = 0; i < coodinates.length; i++) {
          pins.push({
            number: i,
            x: coodinates[i][0],
            y: coodinates[i][1],
          })
        }
        const data2 = {
          name: name,
          image: location.state.image.substring(22),
          pins: pins,
          createdBy: user.id,
        }
        axios
          .post('http://localhost:8080/api/templates/me', data2, {withCredentials: true})
          .then((res) => {
            console.log(res.status)
          })
          .catch((error) => {
            console.log(error)
          })
      }
      setCompleteIsOpen(true)
    } else {
      setIsOpen(true)
    }
  }
  React.useEffect(() => {
    setWords([])
    setPlaces([])
    setConditions([])
    setCoodinates([])
    setName('')
    console.log('set')
  }, [useLocation()])

  return (
    <div className={styles.edit}>
      {coodinates.map(([x, y]: [number, number], index) => (
        <PushPinIcon key={index} style={{position: 'absolute', top: y + 'px', left: x + 'px'}} />
      ))}
      <img className={styles.layoutImage} src={imageUrl ?? location.state.image} alt="map" onClick={handleOnClick} />
      <div>
        {[...Array(words.length)].map((_, index: number) => (
          <EditAddedWord
            key={index}
            word={words[index]}
            place={places[index]}
            condition={conditions[index]}
            handleWordChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleWordChange(e, index)
            }
            handlePlaceChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handlePlaceChange(e, index)
            }
            handleConditionChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleConditionChange(e, index)
            }
            handleDelete={() => handleDelete(index)}
          />
        ))}
      </div>
      <AddNewWordDialog
        open={open}
        newWord={newWord}
        newPlace={newPlace}
        newCondition={newCondition}
        setNewWord={setNewWord}
        setNewPlace={setNewPlace}
        setNewCondition={setNewCondition}
        handleClose={handleClose}
        handleClick={handleClick}
      />
      <input type="text" value={name} placeholder="宮殿の名前" onChange={handleNameChange} />
      <div>
        <div>
          <label>
            <input type="checkbox" onClick={() => setShareOptin(!shareOption)} id="sharedCheckBox" />
            共有
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" onClick={() => setTemplateOption(!templateOption)} />
            テンプレートとして保存
          </label>
        </div>
      </div>
      <button onClick={handleComplete}>完成!</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <span>単語もしくは宮殿の名前が登録されていません。</span>
        <button onClick={() => setIsOpen(false)}>OK</button>
      </Dialog>
      <Dialog open={completeIsOpen}>
        宮殿が完成しました
        <Link to={'/memorize/' + palaceId}>今すぐ覚える</Link>
        <Link to="/">ホームへ戻る</Link>
      </Dialog>
    </div>
  )
}
