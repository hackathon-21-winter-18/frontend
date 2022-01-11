import axios from 'axios'

export const getTokenInfo = async (id_token: string) => {
  const res = await axios.get('https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=' + id_token)
  return res.data
}
