import React, { useEffect, useRef, useState } from 'react'
import styles from './MessageBox.module.scss'
import FormSmile from '../../Shared/FormSmiles/FormSmile'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import { setMessages } from '../../App/Redux/Reducers/contentReducer'

export default function MessageBox({ socket }) {
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const messages = useAppSelector(
    (state) => state.contentReduser.messager.messages
  )
  const username = useAppSelector((state) => state.userReduser.user.username)
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )
  const dispatch = useAppDispatch()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      friendname === arrivalMessage.sender &&
      console.log(arrivalMessage)
    dispatch(
      setMessages({
        date: new Date().toUTCString(),
        key: arrivalMessage?.sender,
        message: arrivalMessage?.text,
      })
    )
  }, [arrivalMessage])

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
