import styles from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import FromNewPalace from './DialogFromNewPalace'
import useAuth from './UserProvider'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import {useState} from 'react'
import Popover from '@mui/material/Popover'
import {getNotice} from '../api/notice'
import {NoticeType} from '../types'
import {calcTimeDiff} from '../util/calucTimeDiff'

const Header: React.VFC = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [notices, setNotices] = useState<NoticeType[]>(new Array<NoticeType>())
  const [unreadNotices, setUnreadNotices] = useState<number>(user.unreadNotices)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    getNotice((res) => {
      if (res.data) {
        setNotices(res.data)
      }
    })
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setUnreadNotices(0)
  }
  function Routing(content: string, index: number) {
    switch (content.substring(19, 20)) {
      case '宮':
        handleClose()
        navigate('/memorize/' + notices[index].palaceID, {state: {shared: true}})
        break
      case 'テ':
        handleClose()
        navigate('/fromTemplate/' + notices[index].templateID, {state: {shared: true}})
        break
      default:
        navigate('/notFound')
    }
  }
  const noticeList = notices.map((notice, index) => (
    <li key={index} className={styles.li}>
      <div
        onClick={() => Routing(notice.content, index)}
        className={styles.background}
        style={{backgroundColor: notices[index].checked ? 'white' : '#f3f6fb'}}>
        <div className={styles.content}>
          <span>{notice.content}</span>
        </div>
        <div className={styles.bottom}>
          <div className={styles.time}>
            <span>{calcTimeDiff(notice.created_at)}</span>
          </div>
          <div className={styles.confirm}>
            <span>確認する</span>
          </div>
        </div>
      </div>
    </li>
  ))

  return (
    <>
      <div className={styles.header}>
        <img
          className={styles.logo}
          src={logo}
          alt="logo"
          onClick={() => navigate(user.auth ? '/palace' : '/sharedPalaces')}
        />
        {user.auth ? (
          <div className={styles.right}>
            <button className={styles.notice} onClick={handleClick}>
              <NotificationsNoneIcon className={styles.noticeIcon} fontSize="large" />
              {unreadNotices !== 0 && unreadNotices ? (
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
              <div className={styles.card}>
                {notices.length !== 0 ? <ul>{noticeList}</ul> : <span>まだ通知はありません</span>}
              </div>
            </Popover>
            <FromNewPalace />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Header
