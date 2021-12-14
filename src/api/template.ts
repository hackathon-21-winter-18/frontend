import axios from 'axios'
import {config} from '../config'

export const postTemplate = (data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .post(config() + '/api/templates/me', data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const getTemplate = async (onSuccess?: () => any, onError?: () => any) => {
  const res = await axios.get(config() + '/api/templates/me', {withCredentials: true})
  return res.data
}

export const putTemplate = (templateID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put(config() + '/api/templates/' + templateID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const putShareTemplate = (templateID: string, data: any, onSuccess?: () => any, onError?: () => any) => {
  axios
    .put(config() + '/api/templates/share/' + templateID, data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}
