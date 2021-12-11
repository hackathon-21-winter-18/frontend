import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {postLogin, postSignUp, getCurrentUser} from '../api/registration'
import {UserRegistration} from '../types'

interface UserContextInterface {
  user: {
    name: string
    id: string
    auth: boolean
  }
  loading: boolean
  login: (user: UserRegistration) => Promise<void>
  signup: (user: UserRegistration) => Promise<void>
  logout: () => void
}

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface)

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState({name: '', id: '', auth: false})
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getCurrentUser()
      .then((user) => user && setUser({...user, auth: true}))
      .finally(() => setLoadingInitial(false))
  }, [])

  const login = async (user: UserRegistration) => {
    setLoading(true)
    // const res = await postLogin(user)
    const res = {name: 'ucciqun', id: 'ididididid'}
    setUser({
      ...res,
      auth: true,
    })
    setLoading(false)
  }
  const signup = async (user: UserRegistration) => {
    setLoading(true)
    const res = await postSignUp(user)
    setUser({
      ...res,
      auth: true,
    })
    setLoading(false)
  }
  const logout = () => {
    setUser({
      name: '',
      id: '',
      auth: false,
    })
  }
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
    }),
    [user, loading]
  )
  return <UserContext.Provider value={memoedValue}>{!loadingInitial && children}</UserContext.Provider>
}

export default function useAuth() {
  return useContext(UserContext)
}
