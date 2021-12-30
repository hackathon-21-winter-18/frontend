import React, {useState} from 'react'
import styles from './Login.module.css'
import useAuth from '../components/UserProvider'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'

const Login: React.VFC = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errStatus, setErrStatus] = useState('')
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (name === '' || password === '') return
    await login({name, password})
      .then(() => {
        setName('')
        setPassword('')
        navigate('/')
      })
      .catch((err) => {
        setErrStatus(err.response.status.toString())
      })
  }

  return (
    <div className={styles.layout}>
      <div className={styles.login}>
        <img src={logo} alt="palamo logo" className={styles.logo} />
        <h1>ログイン</h1>
        <div className={styles.divider} />
        <h2>おかえりなさい！</h2>
        <form className={styles.form}>
          <input type="text" name="name" placeholder="ユーザー名" onChange={(e) => setName(e.target.value)} required />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className={styles.errorMessage}>
            {errStatus === '404'
              ? 'ユーザー名が間違っています'
              : errStatus === '403'
              ? 'パスワードが間違っています'
              : null}
          </span>
          <div className={styles.buttonContainer}>
            <Link className={styles.signupButton} to="/signup">
              アカウントを作成する
            </Link>
            <button className={styles.loginButton} onClick={handleLogin} type="submit" disabled={!name || !password}>
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
