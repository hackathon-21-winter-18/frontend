import axios from 'axios'
import {config} from '../config'
import {RegistrationResponse, UserRegistration} from '../types'

const endpoint = 'https://hackathon-21-winter-18.trap.show/backend'

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
