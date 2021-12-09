import React, {useState} from 'react'
import styles from './Login.module.css'
import {useContext} from 'react'
import {UserContext} from '../components/UserProvider'
import {Link} from 'react-router-dom'

const Login: React.VFC = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useContext(UserContext)

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (name === '' || password === '') return

    await login({name, password})
    setName('')
    setPassword('')
  }

  return (
    <div className={styles.layout}>
      <div className={styles.login}>
        <h1>ログイン</h1>
        <div className={styles.divider} />
        <h2>おかえりなさい。</h2>
        <form className={styles.form}>
          <input type="text" name="name" placeholder="ユーザー名" onChange={(e) => setName(e.target.value)} required />
          <input
            type="text"
            name="password"
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
