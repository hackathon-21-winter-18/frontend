import React, {useState} from 'react'
import styles from './Sidebar.module.css'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import BalconyIcon from '@mui/icons-material/Balcony'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttractionsIcon from '@mui/icons-material/Attractions'
import useAuth from './UserProvider'
import {Menu} from '@mui/material'

const Sidebar: React.VFC = () => {
  const {pathname} = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const {user, logout} = useAuth()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={pathname === '/' ? styles.buttonHere : styles.buttonNotHere}>
        <HomeIcon className={styles.buttonIcon} />
        My Palace
      </Link>
      <Link to="/template" className={pathname === '/template' ? styles.buttonHere : styles.buttonNotHere}>
        <BalconyIcon className={styles.buttonIcon} />
        My Template
      </Link>
      <Link to="/sharedPalaces">Shared Palaces</Link>
      <Link to="/sharedTemplates">Shared Templates</Link>
      <Link to="/playground" className={pathname === '/playground' ? styles.buttonHere : styles.buttonNotHere}>
        <AttractionsIcon className={styles.buttonIcon} style={{color: '#2C9212'}} />
        Playground
      </Link>
      <button className={styles.userSetting} onClick={handleClick}>
        <PersonPinIcon className={styles.userIcon} />
        {user.name}
        <MoreVertIcon className={styles.lastIcon} />
      </button>
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
    </div>
  )
}

export default Sidebar
