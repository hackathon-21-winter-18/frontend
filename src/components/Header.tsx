import styles from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import FromNewPalace from './DialogFromNewPalace'
import FromNewTemplate from './DialogFromNewTemplate'
import useAuth from './UserProvider'

const Header: React.VFC = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  return (
    <>
      {user.auth && (
        <div className={styles.header}>
          <img className={styles.logo} src={logo} alt="logo" onClick={() => navigate('/')} />
          <FromNewPalace />
          <FromNewTemplate />
        </div>
      )}
    </>
  )
}

export default Header
