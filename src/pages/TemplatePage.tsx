import styles from './TemplatePage.module.css'
import {useEffect, useState} from 'react'
import Template from '../components/Template'
import {TemplateType} from '../types'
import axios from 'axios'
import CreateNewTemplateButton from '../components/CreateNewTemplateButton'
import {config} from '../config'

const TemplatePage: React.VFC = () => {
  const [templates, setTemplates] = useState(new Array<TemplateType>())
  const listItems = templates.map((template, index) => (
    <li key={template.id}>
      <Template num={index} template={template} deleteTemplate={DeleteTemplate} />
    </li>
  ))
  function DeleteTemplate(number: number) {
    setTemplates(templates.slice(0, number).concat(templates.slice(number + 1)))
  }
  useEffect(() => {
    axios.get(config() + '/api/templates/me', {withCredentials: true}).then((res) => {
      if (res.data) {
        setTemplates(res.data)
        console.log(res.data)
      }
    })
  }, [])

  return (
    <div className={styles.templatePage}>
      <h1>My Templates</h1>
      <div className={styles.divider} />
      <ul className={styles.templateContainer}>
        <CreateNewTemplateButton />

        {listItems}
      </ul>
    </div>
  )
}

export default TemplatePage
