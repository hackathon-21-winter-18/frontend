import axios from 'axios'
import {RegistrationResponse, UserRegistration} from '../types'

const endpoint = 'http://localhost:8080'

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
  const res = await axios.get<RegistrationResponse | undefined>('http://localhost:8080/api/oauth/whoamI', {
    withCredentials: true,
  })
  return res.data
}
