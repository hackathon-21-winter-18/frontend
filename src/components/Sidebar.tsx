import React, {useState} from 'react'
import styles from './Sidebar.module.css'
import {useLocation, useNavigate} from 'react-router'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import BalconyIcon from '@mui/icons-material/Balcony'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttractionsIcon from '@mui/icons-material/Attractions'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import EditIcon from '@mui/icons-material/Edit'
import useAuth from './UserProvider'
import {Menu} from '@mui/material'
import Quiz from '../components/Quiz'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import {putUserName, getCurrentUser} from '../api/registration'
import {generateCrypt} from '../util/generateCrypt'
import {config2} from '../config'

const Sidebar: React.VFC = () => {
  const {pathname} = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const {user, logout, setUser} = useAuth()
  const navigate = useNavigate()
  const [nameFixDialogIsOpen, setNameFixDialogIsOpen] = useState(false)
  const [userName, setUserName] = useState(user.name)
  const nonce = generateCrypt(32)
  const client_id = process.env.REACT_APP_PALAMO_CLIENT_ID
  const URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid&redirect_uri=${config2()}/callback&nonce=${nonce}`

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (user.auth) {
      setAnchorEl(e.currentTarget)
    } else {
      sessionStorage.setItem('nonce', nonce)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleSubmitNewName() {
    putUserName(userName).then(() => {
      setNameFixDialogIsOpen(false)
      getCurrentUser().then((user) => user && setUser({...user, auth: true}))
    })
  }
  return (
    <div className={styles.sidebar}>
      {user.auth ? (
        <>
          <Link
            to="/palace"
            className={pathname === '/palace' || pathname === '/' ? styles.buttonHere : styles.buttonNotHere}>
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
      {user.auth ? <Quiz /> : null}

      {user.auth ? (
        <>
          <button className={styles.userSetting} onClick={handleClick}>
            <PersonPinIcon className={styles.userIcon} />
            {user.name}
            <MoreVertIcon className={styles.lastIcon} />
          </button>
        </>
      ) : (
        <>
          <button className={styles.loginButton} onClick={handleClick}>
            <LoginIcon className={styles.loginIcon} />
            <a href={URL} className={styles.loginButtonURL}>
              新規登録 or ログイン
            </a>
          </button>
        </>
      )}

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
              <div className={styles.name}>
                <span>{user.name}でログイン中</span>
                <button onClick={() => setNameFixDialogIsOpen(true)}>
                  <EditIcon />
                </button>
              </div>
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
          <Dialog
            open={nameFixDialogIsOpen}
            onClose={() => setNameFixDialogIsOpen(false)}
            className={styles.nameFixDialog}>
            <DialogTitle>名前を変更します</DialogTitle>
            <DialogActions>
              <input
                required
                type="text"
                value={userName}
                placeholder="新しい名前"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={handleSubmitNewName} className={styles.button2}>
                決定
              </button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </div>
  )
}

export default Sidebar
