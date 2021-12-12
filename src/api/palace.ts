import axios from 'axios'
import {config} from '../config'

export const postPalace = (data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .post('https://hackathon-21-winter-18.trap.show/backend/api/palaces/me', data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const putPalace = (palaceID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put('https://hackathon-21-winter-18.trap.show/backend/' + palaceID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const getPalace = async (palaceID: string, onSuccess?: () => any, onError?: () => any) => {
  const res = await axios.get('https://hackathon-21-winter-18.trap.show/backend/' + palaceID, {withCredentials: true})
  return res.data
}
