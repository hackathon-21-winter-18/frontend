import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import styles from './SignUp.module.css'
import {UserContext} from './UserProvider'

const SignUp: React.VFC = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const {signup} = useContext(UserContext)

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault()
    console.log({name, password})
    await signup({name, password})
    setName('')
    setPassword('')
  }

  return (
    <div className={styles.signup}>
      <form>
        <input
          type="text"
          name="name"
          placeholder="ユーザー名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード(確認)"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button onClick={handleRegister}>登録</button>
        <Link to="/login">ログインする</Link>
      </form>
    </div>
  )
}

export default SignUp
