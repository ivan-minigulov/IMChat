import React, { useState } from 'react'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { green } from '@mui/material/colors'
import Icon from '@mui/material/Icon'
import Tooltip from '@mui/material/Tooltip'
import styles from './List.module.scss'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import { friendAdd } from '../../App/Redux/Reducers/userReducer'

export default function ListForSearch({ list }) {
  const { username } = useAppSelector((state) => state.userReduser.user)
  const dispatch = useAppDispatch()

  return (
    <List className={styles.list} dense>
      {list.map((value, key) => {
        const labelId = `checkbox-list-secondary-label-${value}`
        return (
          <ListItem
            key={key}
            secondaryAction={
              <div>
                <Tooltip title="Добавить в друзья" placement="right">
                  <IconButton
                    onClick={() => {
                      // console.log(value)
                      dispatch(friendAdd({ username, friendname: value }))
                    }}
                  >
                    <Icon
                      className={styles.iconPlus}
                      sx={{ color: green[500] }}
                    >
                      add_circle
                    </Icon>
                  </IconButton>
                </Tooltip>
              </div>
            }
            disablePadding
          >
            <ListItemButton className={styles.item}>
              <ListItemAvatar>
                <Avatar
                  alt={`${value}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
