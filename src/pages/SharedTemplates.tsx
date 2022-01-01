import {useEffect, useState} from 'react'
import styles from './SharedTemplates.module.css'
import SharedTemplate from '../components/SharedTemplate'
import {SharedTemplateType} from '../types'
import {useLocation, Link} from 'react-router-dom'
import {getSharedTemplate} from '../api/template'
import {SortingPublicTemplatesButton} from '../components/SortingPublicTemplatesButton'

const SharedTemplates: React.VFC = () => {
  const [templates, setTemplates] = useState(new Array<SharedTemplateType>())
  const {pathname} = useLocation()

  const listItems = templates.map((template, index) => (
    <li key={template.id}>
      <SharedTemplate num={index} template={template} handleDeleteTemplate={DeleteTemplate} />
    </li>
  ))

  function DeleteTemplate(number: number) {
    setTemplates(templates.slice(0, number).concat(templates.slice(number + 1)))
  }

  useEffect(() => {
    getSharedTemplate((res) => {
      if (res.data) {
        setTemplates(res.data)
      }
    })
  }, [])

  return (
    <div className={styles.sharedTemplates}>
      <h1>Shared Templates</h1>
      <div className={styles.divider} />
      <Link to="/sharedPalaces" className={pathname === '/sharedPalaces' ? styles.buttonHere : styles.buttonNotHere}>
        Shared Palaces
      </Link>
      <Link
        to="/sharedTemplates"
        className={pathname === '/sharedTemplates' ? styles.buttonHere : styles.buttonNotHere}>
        Shared Templates
      </Link>

      <ul className={styles.templateContainer}>
        <SortingPublicTemplatesButton setTemplates={setTemplates} />
        {listItems}
      </ul>
    </div>
  )
}

export default SharedTemplates
