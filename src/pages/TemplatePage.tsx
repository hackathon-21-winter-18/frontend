import {useEffect, useState} from 'react'
import Template from '../components/Template'
import {TemplateType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import useAuth from '../components/UserProvider'

const mockTemplates: TemplateType[] = [
  {
    id: '0',
    name: 'Versailles',
    image: palace1,
    pins: [{number: 0, x: 0, y: 0}],
  },
  {
    id: '1',
    name: 'Buckingham',
    image: palace2,
    pins: [{number: 0, x: 1, y: 1}],
  },
]

const TemplatePage: React.VFC = () => {
  const [templates, setTemplates] = useState([
    {
      id: '',
      name: '',
      image: '',
      pins: [{number: 0, x: 0, y: 0}],
    },
  ])
  const {user} = useAuth()
  const listItems = templates.map((template) => (
    <li key={template.id}>
      <Template template={template} />
    </li>
  ))
  useEffect(() => {
    axios.get('https://hackathon-21-winter-18.trap.show/backend/api/templates/me', {withCredentials: true}).then((res) => setTemplates(res.data))
  }, [])

  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  )
}

export default TemplatePage
