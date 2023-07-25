import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import styles from './Navbar.module.scss'
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../../App/Router/consts'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../App/Redux/hooks'
import { Avatar, Tooltip } from '@mui/material'
import { fetchLogout } from '../../App/Redux/Reducers/userReducer'

export default function Navbar() {
  const navigate = useNavigate()

  const username = useAppSelector((state) => state.userReduser.user.username)
  const dispatch = useAppDispatch()

  return (
    <div className={styles.navbar}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar className={styles.Toolbar}>
            <IconButton
              onClick={() => navigate(MAIN_ROUTE)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Typography color="inherit" variant="h6" component="div">
                IM Chat
              </Typography>
            </IconButton>
            {username ? (
              <div className={styles.divAvatarAndLogout}>
                <Avatar alt="Avatar" />
                <span className={styles.username}>{username}</span>
                <IconButton
                  className={styles.LogoutButton}
                  onClick={() => {
                    dispatch(fetchLogout())
                    navigate(LOGIN_ROUTE)
                  }}
                >
                  <Tooltip title="Logout">
                    <LogoutIcon />
                  </Tooltip>
                </IconButton>
              </div>
            ) : (
              <Button onClick={() => navigate(LOGIN_ROUTE)} color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
