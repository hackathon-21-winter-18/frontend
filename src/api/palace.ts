import axios from 'axios'
import {config} from '../config'

export const postPalace = (data: any, onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .post(config() + '/api/palaces/me', data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const getPalace = async (onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .get(config() + '/api/palaces/me', {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}
export const getSharedPalace = async (onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .get(config() + '/api/palaces', {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const putPalace = (palaceID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put(config() + '/api/palaces/' + palaceID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const putSharePalace = async (palaceID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put(config() + '/api/palaces/share/' + palaceID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const deletePalace = async (palaceID: string, onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .delete(config() + '/api/palaces/' + palaceID, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}
