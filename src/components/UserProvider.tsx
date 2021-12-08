import React, {createContext, useState} from 'react'

interface UserContextInterface {
  user: {
    name: string
    id: string
    auth: boolean
  }
  login: (name: string, id: string) => void
  logout: () => void
}

const initialContext: UserContextInterface = {
  user: {
    name: '',
    id: '',
    auth: false,
  },
  login: (_0, _1) => {},
  logout: () => {},
}

export const UserContext = createContext<UserContextInterface>(initialContext)

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState({name: '', id: '', auth: false})
  const login = (name: string, id: string) => {
    setUser({
      name: name,
      id: id,
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
