import styles from './Login.module.css'
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
        <h1>ログイン</h1>
        <div className={styles.divider} />
        <button className={styles.loginButton} onClick={handleLogin} type="submit">
          ログイン
        </button>
      </div>
    </div>
  )
}
export default Login
