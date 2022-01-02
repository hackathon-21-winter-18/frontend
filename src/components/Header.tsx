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
import {getNotice} from '../api/notice'
import {NoticeType} from '../types'

const mockNotice = [
  {id: 1, read: false, content: '通知1'},
  {id: 2, read: true, content: '通知2'},
  {id: 3, read: false, content: '通知3'},
]
const Header: React.VFC = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  //const [notices, setNotices] = useState<NoticeType[]>(new Array<NoticeType>())
  const [notices, setNotices] = useState(mockNotice)
  const [unreadNotices, setUnreadNotices] = useState<number>(() => {
    let unreadCount = 0
    for (let i = 0; i < notices.length; i++) {
      if (!notices[i].read) {
        unreadCount += 1
      }
    }
    return unreadCount
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    getNotice((res) => setNotices(res.data))
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  function handleNoticeClick(index: number) {
    let noticesCopy = [...notices]
    noticesCopy[index].read = !noticesCopy[index].read
    setNotices(noticesCopy)
    let unreadCount = 0
    for (let i = 0; i < notices.length; i++) {
      if (!notices[i].read) {
        unreadCount += 1
      }
    }
    setUnreadNotices(unreadCount)
  }

  const noticeList = notices.map((notice, index) => (
    <li key={index} className={styles.li}>
      <div
        onClick={() => handleNoticeClick(index)}
        className={styles.noticeButton}
        style={{backgroundColor: notices[index].read ? 'white' : '#f3f6fb'}}>
        {notice.content}
        <button
          onClick={() => {
            let noticesCopy = [...notices]
            noticesCopy.splice(index, 1)
            setNotices(noticesCopy)
            setUnreadNotices(unreadNotices - 1)
          }}
          className={styles.deleteButton}>
          <DeleteOutlineIcon color="error" />
        </button>
      </div>
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
              <div className={styles.card}>{notices.length !== 0 ? <ul>{noticeList}</ul> : 'まだ通知はありません'}</div>
            </Popover>
            <FromNewPalace />
          </div>
        </div>
      )}
    </>
  )
}

export default Header
