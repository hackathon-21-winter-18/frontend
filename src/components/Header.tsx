import {useContext} from 'react'
import styles from './Header.module.css'
import {Link} from 'react-router-dom'
import logo from '../assets/脳みそ.png'
import FromNewPalace from './DialogFromNewPalace'
import {UserContext} from './UserProvider'

const Header: React.VFC = () => {
  const {user, logout} = useContext(UserContext)
  return (
    <div>
      <img src={logo} alt="logo" width="2%" />
      <span>アプリ名</span>
      <Link to="/">ホーム</Link>
      <Link to="/template">テンプレート</Link>
      <FromNewPalace />
      <button onClick={() => logout}>ログアウト</button>
      <span>{user.name}でログイン中</span>
      <Link to="login">ログイン</Link>
    </div>
  )
}

export default Header
