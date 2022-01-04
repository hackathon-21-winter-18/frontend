import styles from './Title.module.css'
import useAuth from '../components/UserProvider'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'

const Login: React.VFC = () => {
  const {oAuthLogin} = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    await oAuthLogin()
      .then(() => {
        navigate('/')
      })
      .catch((err) => alert(err))
  }
  return (
    <div className={styles.layout}>
      <div className={styles.login}>
        <img src={logo} alt="palamo logo" className={styles.logo} />
        <div className={styles.divider} />
        <button className={styles.loginButton} onClick={handleLogin} type="submit">
          新規登録 or ログイン
        </button>
      </div>
    </div>
  )
}
export default Login
