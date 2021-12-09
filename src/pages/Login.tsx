import React, {useState} from 'react'
import styles from './Login.module.css'
import {useContext} from 'react'
import {UserContext} from '../components/UserProvider'

const Login: React.VFC = () => {
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const {login} = useContext(UserContext)

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    await login({name: userName, password: passWord})
    setUserName('')
    setPassWord('')
  }

  return (
    <div>
      <form>
        <input type="text" name="userName" placeholder="ユーザー名" onChange={(e) => setUserName(e.target.value)} />
        <br />
        <input type="text" name="passWord" placeholder="パスワード" onChange={(e) => setPassWord(e.target.value)} />
        <br />
        <button onClick={handleLogin}>ログイン</button>
      </form>
    </div>
  )
}
export default Login
