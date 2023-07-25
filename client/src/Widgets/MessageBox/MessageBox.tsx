import React, { useEffect, useRef } from 'react'
import styles from './MessageBox.module.scss'
import FormSmile from '../../Shared/FormSmiles/FormSmile'
import { useAppSelector } from '../../App/Redux/hooks'

export default function MessageBox() {
  const messages = useAppSelector(
    (state) => state.contentReduser.messager.messages
  )
  const username = useAppSelector((state) => state.userReduser.user.username)
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className={styles.MessageBox}>
      {messages.map((obj, index) => (
        <div
          key={index}
          className={
            obj.key === username
              ? styles.divMessageUser
              : styles.divMessageFriend
          }
        >
          <div
            className={
              obj.key === username ? styles.messageUser : styles.messageFriend
            }
          >
            {obj.message}
          </div>
          <div
            className={
              obj.key === username ? styles.dateUser : styles.dateFriend
            }
          >
            {obj.date}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
