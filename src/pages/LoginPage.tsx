import React from 'react'
import styles from './LoginPage.module.css'
import Login from '../components/Login'

const LoginPage: React.VFC = () => {
  return (
    <div>
      <span>ログインページ</span>
      <Login />
    </div>
  )
}

export default LoginPage
