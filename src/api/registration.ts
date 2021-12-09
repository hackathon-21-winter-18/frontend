import axios from 'axios'
import {RegistrationResponse, UserRegistration} from '../types'

const endpoint = 'http://localhost:8080'

export const postLogin = async (user: UserRegistration) => {
  const res = await axios.post<RegistrationResponse>(endpoint + '/api/oauth/login', user)
  // TODO response error handling
  return res.data
}

export const postSignUp = async (user: UserRegistration) => {
  const res = await axios.post<RegistrationResponse>(endpoint + '/api/oauth/signup', user)
  // TODO response error handling
  return res.data
}
