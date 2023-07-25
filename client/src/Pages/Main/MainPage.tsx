import React from 'react'
import Leftbar from '../../Widgets/Leftbar/Leftbar'
import MessageBar from '../../Widgets/MessageBar/MessageBar'
import styles from './MainPage.module.scss'

export default function MainPage() {
  return (
    <div className={styles.mainPage}>
      <Leftbar />
      <MessageBar />
    </div>
  )
}
