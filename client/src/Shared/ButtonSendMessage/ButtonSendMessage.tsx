import { IconButton } from '@mui/material'
import React from 'react'
import styles from './ButtonSendMessage.module.scss'
import SendIcon from '@mui/icons-material/Send'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import {
  fetchAddMessage,
  valueInputMessage,
} from '../../App/Redux/Reducers/contentReducer'

export default function ButtonSendMessage() {
  const username = useAppSelector((state) => state.userReduser.user.username)
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )
  const message = useAppSelector(
    (state) => state.contentReduser.valueInputMessage
  )
  const dispatch = useAppDispatch()
  return (
    <div className={styles.ButtonSendMessage}>
      <IconButton
        color="inherit"
        onClick={() => {
          if (message) {
            dispatch(fetchAddMessage({ username, friendname, message }))
            dispatch(valueInputMessage(''))
          }
        }}
      >
        <SendIcon color="inherit" />
      </IconButton>
    </div>
  )
}
