import React, { useState, useEffect, useRef } from 'react'
import styles from './MessageBar.module.scss'
import MessageBox from '../MessageBox/MessageBox'
import InputPanel from '../InputPanel/InputPanel'
import TitleMessageBox from '../../Shared/TitleMessageBox/TitleMessageBox'
import { useAppSelector } from '../../App/Redux/hooks'
import { io } from 'socket.io-client'

export default function MessageBar() {
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )
  const username = useAppSelector((state) => state.userReduser.user.username)
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL)
  }, [])

  useEffect(() => {
    socket.current.emit('addUser', username)
  }, [username])

  return (
    <div className={styles.divMessageBar}>
      {friendname ? (
        <div className={styles.messageBar}>
          <TitleMessageBox />
          <MessageBox socket={socket} />
          <InputPanel socket={socket} />
        </div>
      ) : (
        <div className={styles.emptyMessageBar}>
          <div className={styles.textEmptyMessageBar}>Выберите собеседника</div>
        </div>
      )}
    </div>
  )
}
