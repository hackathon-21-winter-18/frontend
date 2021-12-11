import axios from 'axios'
import {config} from '../config'

export const postPalace = (data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .post(config() + '/api/palaces/me', data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const putPalace = (palaceID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put(config() + palaceID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const getPalace = (palaceID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .get(config() + palaceID, data)
    .then(onSuccess)
    .catch(onError)
}
