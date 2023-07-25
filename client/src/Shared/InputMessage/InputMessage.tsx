import React from 'react'
import styles from './InputMessage.module.scss'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import {
  fetchAddMessage,
  valueInputMessage,
} from '../../App/Redux/Reducers/contentReducer'

export default function InputMessage({ socket }) {
  const valueInput = useAppSelector(
    (state) => state.contentReduser.valueInputMessage
  )
  const username = useAppSelector((state) => state.userReduser.user.username)
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )
  const dispatch = useAppDispatch()
  return (
    <input
      type="text"
      className={styles.inputMessage}
      placeholder="Написать сообщение..."
      value={valueInput}
      onChange={(e) => dispatch(valueInputMessage(e.target.value))}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && valueInput) {
          socket.current.emit('sendMessage', {
            senderId: username,
            receiverId: friendname,
            text: valueInput,
          })
          dispatch(
            fetchAddMessage({ username, friendname, message: valueInput })
          )
          dispatch(valueInputMessage(''))
        }
      }}
    />
  )
}
