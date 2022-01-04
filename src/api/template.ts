import axios from 'axios'
import {config} from '../config'

export const postTemplate = (data: any, onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .post(config() + '/api/templates/me', data, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}

export const getTemplate = async (onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .get(config() + '/api/templates/me', {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}
export const getSharedTemplate = async (onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .get(config() + '/api/templates', {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
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

export const deleteTemplate = async (templateID: string, onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .delete(config() + '/api/templates/' + templateID, {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}
