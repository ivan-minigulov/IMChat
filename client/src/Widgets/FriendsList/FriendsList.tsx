import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import styles from './FriendsList.module.scss'
import { ListItemButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import {
  fetchGetAllMessage,
  valueInputMessage,
} from '../../App/Redux/Reducers/contentReducer'

export default function FriendsList() {
  const { followers, username } = useAppSelector(
    (state) => state.userReduser.user
  )
  const friendname = useAppSelector(
    (state) => state.contentReduser.messager.friendname
  )
  const dispatch = useAppDispatch()

  return (
    <div className={styles.friendsList}>
      <p className={styles.title}>Друзья</p>
      <List className={styles.list}>
        {followers.map((friend, key) => (
          <ListItem
            key={key}
            className={
              friendname === friend ? styles.listItemSelect : styles.listItem
            }
            alignItems="flex-start"
            onClick={() => {
              dispatch(fetchGetAllMessage({ username, friendname: friend }))
              dispatch(valueInputMessage(''))
            }}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Avatar" />
              </ListItemAvatar>
              <ListItemText primary={friend} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
