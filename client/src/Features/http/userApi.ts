import { $host, $authHost } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (username: string, password: string) => {
  const response = await $host.post(
    `${process.env.REACT_APP_HTTP_URL_API}user/registration`,
    { username, password }
  )
  localStorage.setItem('accessToken', response.data.accessToken)
  return jwt_decode(response.data.accessToken)
}

export const login = async (username: string, password: string) => {
  const response = await $host.post(
    `${process.env.REACT_APP_HTTP_URL_API}user/login`,
    { username, password }
  )
  localStorage.setItem('accessToken', response.data.accessToken)
  return jwt_decode(response.data.accessToken)
}

export const logout = async () => {
  const res = await $host.post(
    `${process.env.REACT_APP_HTTP_URL_API}user/logout`
  )
  localStorage.removeItem('accessToken')
  return res.data
}

export const checkAuth = async () => {
  const response = await $authHost.post(
    `${process.env.REACT_APP_HTTP_URL_API}user/checkauth`
  )
  return jwt_decode(response.data.accessToken)
}
