import {useEffect, useState, useContext} from 'react'
import styles from 'TemplatePage.module.css'
import Header from '../components/Header'
import Template from '../components/Template'
import {TemplateType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import {UserContext} from '../components/UserProvider'
import Sidebar from '../components/Sidebar'

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
  const {user} = useContext(UserContext)
  const listItems = templates.map((template) => (
    <li key={template.id}>
      <Template template={template} />
    </li>
  ))
  useEffect(() => {
    axios.get('http://localhost:8080/api/templates/me', {withCredentials: true}).then((res) => setTemplates(res.data))
  }, [])

  return (
    <div>
      <Sidebar />
      <ul>{listItems}</ul>
    </div>
  )
}

export default TemplatePage
