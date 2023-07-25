import { $authHost } from './index'

declare var process: any

export const addMessage = async (
  username: string,
  friendname: string,
  message: string
) => {
  const response = await $authHost.post(
    `${process.env.REACT_APP_HTTP_URL_API}message/add`,
    { username, friendname, message }
  )
  return response.data
}

export const getAllMessage = async (username: string, friendname: string) => {
  const response = await $authHost.get(
    `${process.env.REACT_APP_HTTP_URL_API}message/getall`,
    { params: { username, friendname } }
  )
  return response.data
}
