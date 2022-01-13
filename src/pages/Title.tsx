import styles from './Title.module.css'
import logo from '../assets/logo.svg'
import {generateCrypt} from '../util/generateCrypt'
import {config2} from '../config'
import {useNavigate} from 'react-router-dom'

const Title: React.VFC = () => {
  const navigate = useNavigate()
  const nonce = generateCrypt(32)
  const client_id = process.env.REACT_APP_PALAMO_CLIENT_ID
  const URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid&redirect_uri=${config2()}/callback&nonce=${nonce}`
  function handleLogin() {
    sessionStorage.setItem('nonce', nonce)
  }
  return (
    <div className={styles.layout}>
      <div className={styles.login}>
        <img src={logo} alt="palamo logo" className={styles.logo} />
        <div className={styles.divider} />
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleLogin}>
            <a href={URL} className={styles.loginButton}>
              新規登録 or ログイン
            </a>
          </button>
          <button className={styles.trialButton} onClick={() => navigate('/sharedPalaces')}>
            体験版へ
          </button>
        </div>
      </div>
    </div>
  )
}
export default Title
