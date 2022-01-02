import styles from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import FromNewPalace from './DialogFromNewPalace'
import useAuth from './UserProvider'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {useState} from 'react'
import Popover from '@mui/material/Popover'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Header: React.VFC = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [notices, setNotices] = useState<string[]>(['通知１', '通知２', '通知３'])
  const [unreadNotices, setUnReadNotices] = useState<number>(notices.length)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const noticeList = notices.map((notice, index) => (
    <li key={index} className={styles.li}>
      {notice}
      <button
        onClick={() => {
          let noticesCopy = [...notices]
          noticesCopy.splice(index, 1)
          setNotices(noticesCopy)
          setUnReadNotices(unreadNotices - 1)
        }}>
        <DeleteOutlineIcon color="error" />
      </button>
    </li>
  ))

  return (
    <>
      {user.auth && (
        <div className={styles.header}>
          <img className={styles.logo} src={logo} alt="logo" onClick={() => navigate('/')} />
          <div className={styles.right}>
            <button className={styles.notice} onClick={handleClick}>
              <NotificationsNoneIcon className={styles.noticeIcon} fontSize="large" />
              {unreadNotices !== 0 ? (
                <div className={styles.unreadNotices}>
                  <span>{unreadNotices}</span>
                </div>
              ) : null}
            </button>
            <Popover
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className={styles.popover}>
              <div className={styles.card}>{unreadNotices !== 0 ? <ul>{noticeList}</ul> : 'まだ通知はありません'}</div>
            </Popover>
            <FromNewPalace />
          </div>
        </div>
      )}
    </>
  )
}

export default Header
