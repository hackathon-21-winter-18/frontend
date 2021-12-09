import React, {useState} from 'react'
import styles from './Login.module.css'
import {useContext} from 'react'
import {UserContext} from './UserProvider'

const Login: React.VFC = () => {
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const {login} = useContext(UserContext)
  async function handleRegister() {
    await login({name: userName, password: passWord})
    setUserName('')
    setPassWord('')
  }
  async function handleLogin(e: React.MouseEvent) {
    e.preventDefault()
    await login({name: userName, password: passWord})
    setUserName('')
    setPassWord('')
  }

  return (
    <div>
      <span>新規登録orログイン</span>
      <form>
        <input type="text" name="userName" placeholder="ユーザー名" onChange={(e) => setUserName(e.target.value)} />
        <br />
        <input type="text" name="passWord" placeholder="パスワード" onChange={(e) => setPassWord(e.target.value)} />
        <br />
        <button onClick={handleRegister}>新規登録</button>
        <button onClick={handleLogin}>ログイン</button>
      </form>
    </div>
  )
}
export default Login
