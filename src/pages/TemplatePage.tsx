import {useEffect, useState} from 'react'
import styles from 'TemplatePage.module.css'
import Template from '../components/Template'
import {TemplateType} from '../types'
import palace1 from '../assets/ヴェルサイユ宮殿.jpg'
import palace2 from '../assets/バッキンガム宮殿.jpg'
import axios from 'axios'
import Sidebar from '../components/Sidebar'

const mockTemplates: TemplateType[] = [
  {
    id: '0',
    name: 'Versailles',
    image: palace1,
    pins: [{number: 0, x: 0, y: 0}],
    createdBy: 'mehm8128',
  },
  {
    id: '1',
    name: 'Buckingham',
    image: palace2,
    pins: [{number: 0, x: 1, y: 1}],
    createdBy: 'mehm8128',
  },
]

const TemplatePage: React.VFC = () => {
  const [templates, setTemplates] = useState(null)
  //mockTemplates→templates @
  const listItems = mockTemplates.map((template) => (
    <li>
      <Template key={template.id} template={template} />
    </li>
  ))
  /*
	useEffect(() => {
		axios.get("/templates/me/"+userId).then((res) => setTemplates(res.data))
	},[]) @
	*/
  return (
    <div>
      <Sidebar />
      <ul>{listItems}</ul>
    </div>
  )
}

export default TemplatePage
