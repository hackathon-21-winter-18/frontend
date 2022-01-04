import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {getOAuthLogin, postLogin, postSignUp, getCurrentUser, postLogout} from '../api/registration'
import Loading from '../pages/Loading'
import {UserRegistration} from '../types'

interface UserContextInterface {
  user: {
    name: string
    id: string
    auth: boolean
    unreadNotices: number
  }
  loading: boolean
  oAuthLogin: () => Promise<void>
  login: (user: UserRegistration) => Promise<void>
  signup: (user: UserRegistration) => Promise<void>
  logout: () => void
}

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface)

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState({name: '', id: '', auth: false, unreadNotices: 0})
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((user) => user && setUser({...user, auth: true}))
      .finally(() => setLoadingInitial(false))
  }, [])

  const oAuthLogin = async () => {
    setLoading(true)
    await getOAuthLogin().then(() => getCurrentUser().then((user) => user && setUser({...user, auth: true})))
    setLoading(false)
  }
  const login = async (user: UserRegistration) => {
    setLoading(true)
    await postLogin(user).then(() => getCurrentUser().then((user) => user && setUser({...user, auth: true})))
    setLoading(false)
  }
  const signup = async (user: UserRegistration) => {
    setLoading(true)
    await postSignUp(user).then(() => getCurrentUser().then((user) => user && setUser({...user, auth: true})))
    setLoading(false)
  }
  const logout = () => {
    setLoading(true)
    postLogout()
    setUser({
      name: '',
      id: '',
      auth: false,
      unreadNotices: 0,
    })
    setLoading(false)
  }
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      oAuthLogin,
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
