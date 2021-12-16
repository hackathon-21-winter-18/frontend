import {useEffect, useState} from 'react'
import styles from './SharedTemplates.module.css'
import SharedTemplate from '../components/SharedTemplate'
import axios from 'axios'
import {SharedTemplateType} from '../types'
import {config} from '../config'

const SharedTemplates: React.VFC = () => {
  const [templates, setTemplates] = useState(new Array<SharedTemplateType>())

  const listItems = templates.map((template, index) => (
    <li key={template.id}>
      <SharedTemplate template={template} />
    </li>
  ))

  useEffect(() => {
    axios
      .get(config() + '/api/templates', {withCredentials: true})
      .then((res) => {
        if (res.data) {
          setTemplates(res.data)
          console.log(res.data)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={styles.sharedTemplates}>
      <h1>Shared Templates</h1>
      <div className={styles.divider} />
      <ul className={styles.templateContainer}>{listItems}</ul>
    </div>
  )
}

export default SharedTemplates
