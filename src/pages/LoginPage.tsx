import React from 'react'
import styles from './LoginPage.module.css'
import Login from '../components/Login'
import {Link} from 'react-router-dom'

const LoginPage: React.VFC = () => {
  return (
    <div>
      <span>ログインページ</span>
      <Login />
      <Link to="/signup">アカウントを作成する</Link>
    </div>
  )
}

export default LoginPage
