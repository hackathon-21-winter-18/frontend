import React from 'react'
import styles from './Sidebar.module.css'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import BalconyIcon from '@mui/icons-material/Balcony'

const Sidebar: React.VFC = () => {
  const {pathname} = useLocation()
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={pathname === '/' ? styles.buttonHere : styles.buttonNotHere}>
        <HomeIcon className={styles.buttonIcon} />
        Home
      </Link>
      <Link to="/template" className={pathname === '/template' ? styles.buttonHere : styles.buttonNotHere}>
        <BalconyIcon className={styles.buttonIcon} />
        My Template
      </Link>
    </div>
  )
}

export default Sidebar
