import {useEffect, useState} from 'react'
import styles from './Home.module.css'
import SharedTemplate from '../components/SharedTemplate'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import {useContext} from 'react'
import {UserContext} from '../components/UserProvider'
import {SharedTemplateType} from '../types'

const SharedTemplates: React.VFC = () => {
  const [templates, setTemplates] = useState(new Array<SharedTemplateType>())

  const {user} = useContext(UserContext)
  const listItems = templates.map((template, index) => (
    <li key={template.id}>
      <SharedTemplate template={template} />
    </li>
  ))

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/templates', {withCredentials: true})
      .then((res) => {
        if (res.data) {
          setTemplates(res.data)
          console.log(res.data)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={styles.home}>
      <Sidebar />
      <ul>{listItems}</ul>
    </div>
  )
}

export default SharedTemplates
