import axios from 'axios'
import React, {useState} from 'react'
import styles from './Login.module.css'
import {useContext} from 'react'
import {UserContext} from './UserProvider'

const Login: React.VFC = () => {
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const {login} = useContext(UserContext)
  function handleRegister(e: React.MouseEvent) {
    e.preventDefault()
    const data = {
      name: userName,
      password: passWord,
    }
    axios.post('http://localhost:8080/api/oauth/signup', data).then((res) => {
      login(res.data.name, res.data.id)
      setUserName('')
      setPassWord('')
      console.log(res.status)
    })
  }
  function handleLogin(e: React.MouseEvent) {
    e.preventDefault()
    const data = {
      name: userName,
      password: passWord,
    }
    axios.post('http://localhost:8080/api/oauth/login', data).then((res) => {
      login(res.data.name, res.data.id)
      setUserName('')
      setPassWord('')
      console.log(res.status)
    })
  }
  function handleUserNameChange(e: any) {
    setUserName(e.target.value)
  }
  function handlePassWordChange(e: any) {
    setPassWord(e.target.value)
  }
  function handleCheck(e: React.MouseEvent) {
    e.preventDefault()
    axios.get('http://localhost:8080/api/ping').then((res) => {
      console.log(res)
    })
  }
  return (
    <div>
      <span>新規登録orログイン</span>
      <form>
        <input type="text" name="userName" value={userName} placeholder="ユーザー名" onChange={handleUserNameChange} />
        <br />
        <input type="text" name="passWord" value={passWord} placeholder="パスワード" onChange={handlePassWordChange} />
        <br />
        <button onClick={handleRegister}>新規登録</button>
        <button onClick={handleLogin}>ログイン</button>
        <button onClick={handleCheck}>ボタン</button>
      </form>
    </div>
  )
}
export default Login
