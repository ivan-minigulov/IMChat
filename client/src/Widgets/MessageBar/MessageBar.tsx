import React from 'react'
import styles from './MessageBar.module.scss'
import MessageBox from '../MessageBox/MessageBox'
import InputPanel from '../InputPanel/InputPanel'
import TitleMessageBox from '../../Shared/TitleMessageBox/TitleMessageBox'
import { useAppSelector } from '../../App/Redux/hooks'

export default function MessageBar() {
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )
  return (
    <div className={styles.divMessageBar}>
      {friendname ? (
        <div className={styles.messageBar}>
          <TitleMessageBox />
          <MessageBox />
          <InputPanel />
        </div>
      ) : (
        <div className={styles.emptyMessageBar}>
          <div className={styles.textEmptyMessageBar}>Выберите собеседника</div>
        </div>
      )}
    </div>
  )
}
