import {useContext} from 'react'
import styles from './Header.module.css'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/脳みそ.png'
import FromNewPalace from './DialogFromNewPalace'
import {UserContext} from './UserProvider'
import axios from 'axios'

const Header: React.VFC = () => {
  const {user, logout} = useContext(UserContext)
  const navigate = useNavigate()
  function handleGet() {
    axios.get('http://localhost:8080/api/oauth/whoamI').then((res) => {
      console.log(res.data)
      console.log(res.data.id, res.data.name)
    })
  }
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" width="2%" onClick={() => navigate('/')} />
      <span>Palamo</span>
      {user.auth ? (
        <>
          <span>{user.name}でログイン中</span>
          <FromNewPalace />
          <Link to="login" onClick={logout}>
            ログアウト
          </Link>
        </>
      ) : (
        <>
          <Link to="login">ログイン</Link>
        </>
      )}
      <button onClick={handleGet}>ボタン</button>
    </div>
  )
}

export default Header
