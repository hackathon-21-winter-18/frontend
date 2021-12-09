import React, {createContext, useState} from 'react'
import {postLogin} from '../api/registration'
import {RegistrationResponse, UserRegistration} from '../types'

interface UserContextInterface {
  user: {
    name: string
    id: string
    auth: boolean
  }
  login: (user: UserRegistration) => Promise<void>
  logout: () => void
}

const initialContext: UserContextInterface = {
  user: {
    name: '',
    id: '',
    auth: false,
  },
  login: (_0) => new Promise(() => {}),
  logout: () => {},
}

export const UserContext = createContext<UserContextInterface>(initialContext)

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState({name: '', id: '', auth: false})
  const login = async (user: UserRegistration) => {
    const res = await postLogin(user)
    setUser({
      ...res,
      auth: true,
    })
  }
  const logout = () => {
    setUser({
      name: '',
      id: '',
      auth: false,
    })
  }
  return <UserContext.Provider value={{user, login, logout}}>{children}</UserContext.Provider>
}
