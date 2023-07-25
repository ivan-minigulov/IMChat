import { $authHost } from './index'
import jwt_decode from 'jwt-decode'

declare var process: any

export const usersSearch = async (value: string) => {
  const { data } = await $authHost.get(
    `${process.env.REACT_APP_HTTP_URL_API}friends/search`,
    { params: { value } }
  )
  return data
}

export const addFriendReq = async (username: string, friendname: string) => {
  const response = await $authHost.post(
    `${process.env.REACT_APP_HTTP_URL_API}friends/add`,
    { username, friendname }
  )
  localStorage.setItem('accessToken', response.data.accessToken)
  return jwt_decode(response.data.accessToken)
}
