import axios from 'axios'
import {config} from '../config'
import {RegistrationResponse, UserRegistration} from '../types'

const endpoint = config()

export const getOAuthLogin = async () => {
  const res = await axios.get<RegistrationResponse>(endpoint + '/api/oauth/genpkce', {withCredentials: true})
  // TODO response error handling
  return res.data
}

export const postLogin = async (user: UserRegistration) => {
  const res = await axios.post<RegistrationResponse>(endpoint + '/api/oauth/login', user, {withCredentials: true})
  // TODO response error handling
  return res.data
}

export const postSignUp = async (user: UserRegistration) => {
  const res = await axios.post<RegistrationResponse>(endpoint + '/api/oauth/signup', user, {withCredentials: true})
  // TODO response error handling
  return res.data
}

export const getCurrentUser = async () => {
  const res = await axios.get<RegistrationResponse | undefined>(endpoint + '/api/oauth/whoamI', {
    withCredentials: true,
  })
  return res.data
}

export const postLogout = async () => {
  await axios.post(endpoint + '/api/oauth/logout', {}, {withCredentials: true})
}

export const putUserName = async (newUserName: string) => {
  await axios.put(endpoint + '/api/user/name', {name: newUserName}, {withCredentials: true})
}
