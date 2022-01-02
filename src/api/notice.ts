import axios from 'axios'
import {config} from '../config'

export const getNotice = (onSuccess?: (res: any) => any, onError?: () => any) => {
  axios
    .get(config() + '/api/notices', {withCredentials: true})
    .then(onSuccess)
    .catch(onError)
}
