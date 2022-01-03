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
import {timeToString} from '../util/timeToString'
import {calcTimeDiff} from '../util/calucTimeDiff'

const mockNotice = [
  {
    id: 1,
    read: true,
    content: '公開したものを元に他のユーザーが新たな宮殿を公開しました。',
    created_at: '2022-01-03T03:13:09.560Z',
  },
  {
    id: 2,
    read: false,
    content: '公開したものを元に他のユーザーが新たなテンプレートを公開しました。',
    created_at: '2022-01-01T02:13:09.560Z',
  },
  {
    id: 3,
    read: false,
    content: '公開したものを元に他のユーザーが新たな忘却曲線を公開しました。',
    created_at: '2022-01-01T03:13:09.560Z',
  },
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
    setUnreadNotices(0)
  }
  function Routing(content: string, index: number) {
    switch (content.substring(19, 20)) {
      case '宮':
        navigate('/memorize/' + notices[index].id, {state: {shared: true}, replace: true})
        handleClose()
        break
      case 'テ':
        navigate('/fromTemplate/' + notices[index].id, {state: {shared: true}, replace: true})
        handleClose()
        break
      default:
        navigate('/notFound', {replace: true})
    }
  }
  const noticeList = notices.map((notice, index) => (
    <li key={index} className={styles.li}>
      <div
        onClick={() => Routing(notice.content, index)}
        className={styles.background}
        style={{backgroundColor: notices[index].read ? '#f3f6fb' : 'white'}}>
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
