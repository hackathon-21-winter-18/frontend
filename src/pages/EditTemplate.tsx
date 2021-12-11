import * as React from 'react'
import {useParams, useLocation} from 'react-router'
import PushPinIcon from '@mui/icons-material/PushPin'
import axios from 'axios'
import {UserContext} from '../components/UserProvider'
import {Pins} from '../types'
import Dialog from '@mui/material/Dialog'

export const EditTemplate: React.VFC = () => {
  const [coodinates, setCoodinates] = React.useState(new Array<[number, number]>())
  const image = useParams() //あとで使うかも
  const location = useLocation()
  const [name, setName] = React.useState('')
  const {user} = React.useContext(UserContext)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setCoodinates(coodinates.concat([[e.pageX, e.pageY]]))
  }
  const handleDelete = (index: number) => {
    const _coodinates = coodinates.slice()
    _coodinates.splice(index, 1)
    setCoodinates([..._coodinates])
  }
  function handleNameChange(e: any) {
    setName(e.target.value)
  }

  function handleComplete() {
    if (coodinates.length > 0 && name !== '') {
      let pins = new Array<Pins>()
      for (let i = 0; i < coodinates.length; i++) {
        pins.push({
          number: i,
          x: coodinates[i][0],
          y: coodinates[i][1],
        })
      }
      const data = {
        name: name,
        image: location.state.image.substring(22),
        pins: pins,
        createdBy: user.id,
      }
      console.log(data)
      axios
        .post('http://localhost:8080/api/templates/me', data, {withCredentials: true})
        .then((res) => {
          console.log(res.status)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setIsOpen(true)
    }
  }
  const listItems = coodinates.map((coodinate, index) => (
    <li key={index}>
      ({coodinate[0]},{coodinate[1]})<button onClick={() => handleDelete(index)}>削除</button>
    </li>
  ))

  return (
    <div>
      {coodinates.map(([x, y]: [number, number], index) => (
        <PushPinIcon key={index} style={{position: 'absolute', top: y + 'px', left: x + 'px'}} />
      ))}
      <div>
        <img src={location.state.image} alt="map" onClick={handleOnClick} />
      </div>
      <ol>{listItems}</ol>
      <input type="text" value={name} placeholder="テンプレートの名前" onChange={handleNameChange} />
      <button onClick={handleComplete}>完成!</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <span>ピンもしくはテンプレートの名前が登録されていません。</span>
        <button onClick={() => setIsOpen(false)}>OK</button>
      </Dialog>
    </div>
  )
}
