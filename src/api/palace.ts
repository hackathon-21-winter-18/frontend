import axios from 'axios'
import {config} from '../config'

export const postPalace = (data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .post(config() + '/api/palaces/me', data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const getPalace = async (onSuccess?: () => any, onError?: () => any) => {
  const res = await axios.get(config() + '/api/palaces/me', {withCredentials: true})
  return res.data
}

export const putPalace = (palaceID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put(config() + '/api/palaces/' + palaceID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const putSharePalace = (palaceID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put(config() + '/api/palaces/share/' + palaceID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}
