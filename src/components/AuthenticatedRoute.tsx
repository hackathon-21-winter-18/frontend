import {Navigate, Outlet} from 'react-router-dom'
import useAuth from './UserProvider'

const AuthenticatedRoute: React.VFC = () => {
  const {user} = useAuth()

  return user.auth ? <Outlet /> : <Navigate to="/" />
}

export default AuthenticatedRoute
