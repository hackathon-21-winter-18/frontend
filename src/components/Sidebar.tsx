import React, {useState} from 'react'
import styles from './Sidebar.module.css'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import BalconyIcon from '@mui/icons-material/Balcony'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttractionsIcon from '@mui/icons-material/Attractions'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import useAuth from './UserProvider'
import {Menu} from '@mui/material'
import Quiz from '../components/Quiz'

const Sidebar: React.VFC = () => {
  const {pathname} = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const {user, logout} = useAuth()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (user.auth) {
      setAnchorEl(e.currentTarget)
    } else {
      //axios.get
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className={styles.sidebar}>
      {user.auth ? (
        <>
          <Link to="/" className={pathname === '/' ? styles.buttonHere : styles.buttonNotHere}>
            <HomeIcon className={styles.buttonIcon} />
            My Palaces
          </Link>
          <Link to="/template" className={pathname === '/template' ? styles.buttonHere : styles.buttonNotHere}>
            <BalconyIcon className={styles.buttonIcon} />
            My Templates
          </Link>
        </>
      ) : null}
      <Link
        to="/sharedPalaces"
        className={
          pathname === '/sharedPalaces' || pathname === '/sharedTemplates' ? styles.buttonHere : styles.buttonNotHere
        }>
        <TravelExploreIcon className={styles.buttonIcon} />
        Explorer
      </Link>
      <Link to="/playground" className={pathname === '/playground' ? styles.buttonHere : styles.buttonNotHere}>
        <AttractionsIcon className={styles.buttonIcon} />
        Playground
      </Link>
      <Quiz />
      <button className={styles.userSetting} onClick={handleClick}>
        {user.name ? (
          <>
            <PersonPinIcon className={styles.userIcon} />
            user.name
          </>
        ) : (
          <>
            <LoginIcon className={styles.loginIcon} />
            <span style={{fontSize: 16}}>新規登録 or ログイン</span>
          </>
        )}
        <MoreVertIcon className={styles.lastIcon} />
      </button>
      {user.auth ? (
        <>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            elevation={3}
            className={styles.menu}>
            <div className={styles.card}>
              <p>{user.name}でログイン中</p>
              <button
                className={styles.logout}
                onClick={() => {
                  handleClose()
                  logout()
                }}>
                <LogoutIcon />
                ログアウト
              </button>
            </div>
          </Menu>
        </>
      ) : null}
    </div>
  )
}

export default Sidebar
