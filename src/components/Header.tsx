import {useContext} from 'react'
import styles from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import FromNewPalace from './DialogFromNewPalace'
import {UserContext} from './UserProvider'
import FromNewTemplate from './DialogFromNewTemplate'

const Header: React.VFC = () => {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <>
      {user.auth && (
        <div className={styles.header}>
          <img className={styles.logo} src={logo} alt="logo" onClick={() => navigate('/')} />
          <FromNewPalace />
        </div>
      )}
    </>
  )
}

export default Header
