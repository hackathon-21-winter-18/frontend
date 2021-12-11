import {useEffect, useState, useContext} from 'react'
import styles from './TemplatePage.module.css'
import Header from '../components/Header'
import Template from '../components/Template'
import {TemplateType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import {UserContext} from '../components/UserProvider'
import Sidebar from '../components/Sidebar'
import CreateNewTemplateButton from '../components/CreateNewTemplateButton'

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
  const listItems = templates.map((template, index) => (
    <li key={template.id}>
      <Template num={index} template={template} deleteTemplate={DeleteTemplate} />
    </li>
  ))
  function DeleteTemplate(number: number) {
    setTemplates(templates.slice(0, number).concat(templates.slice(number + 1)))
  }
  useEffect(() => {
    axios.get('http://localhost:8080/api/templates/me', {withCredentials: true}).then((res) => {
      if (res.data.length !== 0) {
        setTemplates(res.data)
        console.log(res.data)
      }
    })
  }, [])

  return (
    <div className={styles.templatePage}>
      <Sidebar />
      <ul className={styles.templateContainer}>
        <CreateNewTemplateButton />

        {listItems}
      </ul>
    </div>
  )
}

export default TemplatePage
