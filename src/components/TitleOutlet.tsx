import {Navigate} from 'react-router-dom'
import Title from '../pages/Title'
import useAuth from './UserProvider'

const TitleOutlet: React.VFC = () => {
  const {user} = useAuth()

  return user.auth ? <Navigate to="/palace" /> : <Title />
}

export default TitleOutlet
