import React from 'react'
import { useAppSelector } from '../../App/Redux/hooks'
import styles from './TitleMessageBox.module.scss'

export default function TitleMessageBox() {
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )
  return (
    <div className={styles.divFriendname}>
      <span className={styles.friendname}>{friendname}</span>
    </div>
  )
}
