import {useContext} from 'react'
import styles from './Header.module.css'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/脳みそ.png'
import FromNewPalace from './DialogFromNewPalace'
import {UserContext} from './UserProvider'

const Header: React.VFC = () => {
  const {user, logout} = useContext(UserContext)
  const navigate = useNavigate()
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
    </div>
  )
}

export default Header
