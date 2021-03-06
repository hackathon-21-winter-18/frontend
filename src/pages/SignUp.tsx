import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './SignUp.module.css'
import useAuth from '../components/UserProvider'
import logo from '../assets/logo.svg'

const SignUp: React.VFC = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errStatus, setErrStatus] = useState('')
  const {signup} = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (name === '' || password === '') return

    await signup({name, password})
      .then(() => {
        setName('')
        setPassword('')
        navigate('/palace')
      })
      .catch((err) => {
        setErrStatus(err.response.status.toString())
      })
  }

  return (
    <div className={styles.signupLayout}>
      <div className={styles.signup}>
        <img src={logo} alt="palamo logo" className={styles.logo} />
        <h1>アカウント登録</h1>
        <div className={styles.divider} />
        <h2>
          <span>Palamo</span>へようこそ。
        </h2>
        <form className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="ユーザー名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード(確認)"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <span className={styles.errorMessage}>
            {errStatus === '500' ? '既に同じユーザー名のアカウントが存在しています' : null}
          </span>
          <div className={styles.buttonContainer}>
            <Link className={styles.loginButton} to="/">
              ログインする
            </Link>
            <button
              className={styles.registerButton}
              onClick={handleRegister}
              type="submit"
              disabled={!name || !password || !passwordConfirm || password !== passwordConfirm}>
              アカウント登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
