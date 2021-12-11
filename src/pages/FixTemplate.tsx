import * as React from 'react'
import {useParams, useLocation} from 'react-router'
import PushPinIcon from '@mui/icons-material/PushPin'
import axios from 'axios'
import {UserContext} from '../components/UserProvider'
import {TemplateType, Pins} from '../types'
import Dialog from '@mui/material/Dialog'
import {Link} from 'react-router-dom'
export const FixTemplate: React.VFC = () => {
  const [coodinates, setCoodinates] = React.useState(new Array<[number, number]>())
  const location = useLocation()
  const [name, setName] = React.useState('')
  const {user} = React.useContext(UserContext)
  const [template, setTemplate] = React.useState<TemplateType>({
    id: '',
    name: '',
    image: '',
    pins: [{number: 0, x: 0, y: 0}],
    share: false,
  })
  const params = useParams()
  const [isOpen, setIsOpen] = React.useState(false)
  const [shareOption, setShareOptin] = React.useState(false)
  const [completeIsOpen, setCompleteIsOpen] = React.useState(false)

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
  React.useEffect(() => {
    axios.get('http://localhost:8080/api/templates/me', {withCredentials: true}).then((res) => {
      const data = res.data
      let name2 = name
      let coodinates2 = coodinates
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === params.id) {
          setTemplate(data[i])
          for (let j = 0; j < data[i].pins.length; j++) {
            name2 = data[i].name
            coodinates2 = coodinates2.concat([[data[i].pins[j].x, data[i].pins[j].y]])
          }
        }
      }
      setName(name2)
      setCoodinates(coodinates2)
      console.log('set!')
    })
  }, [])

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
      }
      console.log(data)
      axios
        .put('http://localhost:8080/api/templates/' + template.id, data, {withCredentials: true})
        .then((res) => {
          console.log(res.status)
          if (shareOption) {
            axios
              .put(
                'http://localhost:8080/api/templates/share/' + template.id,
                {share: shareOption},
                {withCredentials: true}
              )
              .then((res) => console.log(res.status))
              .catch((error) => {
                console.log(error)
              })
          }
          setCompleteIsOpen(true)
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
      <div>
        <label>
          <input type="checkbox" onClick={() => setShareOptin(!shareOption)} id="sharedCheckBox" />
          共有
        </label>
      </div>
      <button onClick={handleComplete}>完成!</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <span>ピンもしくはテンプレートの名前が登録されていません。</span>
        <button onClick={() => setIsOpen(false)}>OK</button>
      </Dialog>
      <Dialog open={completeIsOpen}>
        テンプレートが修正されました
        <Link to="/">ホームへ戻る</Link>
      </Dialog>
    </div>
  )
}
