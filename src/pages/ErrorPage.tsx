import styles from './ErrorPage.module.css'
import {useLocation} from 'react-router-dom'

const ErrorPage: React.VFC = () => {
  let location = useLocation()
  return (
    <div>
      <h1>{location.state.message}</h1>
    </div>
  )
}

export default ErrorPage
