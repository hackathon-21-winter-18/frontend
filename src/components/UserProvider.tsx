import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {postLogin, postSignUp, getCurrentUser, postLogout} from '../api/registration'
import Loading from '../pages/Loading'
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

  useEffect(() => {
    getCurrentUser()
      .then((user) => user && setUser({...user, auth: true}))
      .finally(() => setLoadingInitial(false))
  }, [])

  const login = async (user: UserRegistration) => {
    setLoading(true)
    const res = await postLogin(user)
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
    setLoading(true)
    postLogout()
    setUser({
      name: '',
      id: '',
      auth: false,
    })
    setLoading(false)
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
  return <UserContext.Provider value={memoedValue}>{loadingInitial ? <Loading /> : children}</UserContext.Provider>
}

export default function useAuth() {
  return useContext(UserContext)
}
