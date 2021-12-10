import {useContext} from 'react'
import styles from './Header.module.css'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import FromNewPalace from './DialogFromNewPalace'
import {UserContext} from './UserProvider'

const Header: React.VFC = () => {
  const {user, logout} = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <div className={styles.header}>
      {user.auth && (
        <>
          <img className={styles.logo} src={logo} alt="logo" onClick={() => navigate('/')} />
          <span>{user.name}でログイン中</span>
          <FromNewPalace />
          <Link to="login" onClick={logout}>
            ログアウト
          </Link>
        </>
      )}
    </div>
  )
}

export default Header
