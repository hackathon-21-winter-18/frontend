import {useContext} from 'react'
import styles from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/脳みそ.png'
import FromNewPalace from './DialogFromNewPalace'
import {UserContext} from './UserProvider'

const Header: React.VFC = () => {
  const {user, logout} = useContext(UserContext)
  let navigate = useNavigate()
  function handleNavigate(path: string) {
    navigate(path, {replace: true})
  }
  return (
    <div>
      <img src={logo} alt="logo" width="2%" />
      <span>アプリ名</span>
      <button onClick={() => handleNavigate('/')}>ホーム</button>
      <button onClick={() => handleNavigate('/template')}>テンプレート</button>
      <FromNewPalace />
      <button onClick={() => logout}>ログアウト</button>
      <span>{user.name}でログイン中</span>
      <button onClick={() => handleNavigate('login')}>ログイン</button>
    </div>
  )
}

export default Header
