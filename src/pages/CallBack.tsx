import {useLocation} from 'react-router'
import {useEffect} from 'react'
import userAuth from '../components/UserProvider'
import {getTokenInfo} from '../api/google'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {config2} from '../config'

const CallBack: React.VFC = () => {
  let location = useLocation()
  const query = new URLSearchParams(location.search)
  const {oAuthLogin} = userAuth()
  const client_id = process.env.REACT_APP_PALAMO_CLIENT_ID
  const client_secret = process.env.REACT_APP_PALAMO_CLIENT_SECRET
  const navigate = useNavigate()

  useEffect(() => {
    const code = query.get('code')
    const data = new FormData()
    data.append('grant_type', 'authorization_code')
    data.append('client_id', client_id!)
    data.append('client_secret', client_secret!)
    data.append('code', code!)
    data.append('redirect_uri', config2() + '/callback')

    axios
      .post('https://www.googleapis.com/oauth2/v4/token', data, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then(async (res) => {
        const data = res.data
        /*
        //googleのアイコン画像使う場合
        function parseJwt(token: string) {
          const base64Url = token.split('.')[1]
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
              })
              .join('')
          )
          return JSON.parse(jsonPayload)
        }
        const parsedJWT = parseJwt(res.data.id_token)
        const iconImage = parsedJWT.picture
        */
        //tokenが正しいかどうかの確認(多分googleがsignatureとかの確認してくれる)
        await getTokenInfo(data.id_token)
          .then((res) => {
            //tokenの中身が正しいかどうかの確認
            const nonce = sessionStorage.getItem('nonce')
            if (
              res.audience === client_id &&
              res.issuer === 'https://accounts.google.com' &&
              res.expires_in <= 3600 &&
              res.nonce === nonce &&
              typeof res.user_id === 'string' &&
              res.user_id.length === 21
            ) {
              sessionStorage.removeItem('nonce')
              oAuthLogin(res.user_id)
              navigate('/palace')
            } else {
              //クライアントIDが違うor発行者が違うor期限切れエラーを出す
            }
          })
          .catch((err) => {
            //tokenが改竄されたとかのエラーハンドリング
          })
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return <div></div>
}
export default CallBack
