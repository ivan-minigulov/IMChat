import React from 'react'
import Search from '../Search/Search'
import styles from './Leftbar.module.scss'
import FriendsList from '../FriendsList/FriendsList'

export default function Leftbar() {
  return (
    <div className={styles.Leftbar}>
      <Search />
      <FriendsList />
    </div>
  )
}
