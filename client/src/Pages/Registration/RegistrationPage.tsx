import { Ref, useRef } from 'react'
import styles from './Registration.module.scss'
import { LOGIN_ROUTE, MAIN_ROUTE } from '../../App/Router/consts'
import { useNavigate } from 'react-router-dom'
import { Link } from '@mui/material'
import { registration } from '../../Features/http/userApi'
import React, { useState } from 'react'
import { useAppDispatch } from '../../App/Redux/hooks'
import { fetchRegistration } from '../../App/Redux/Reducers/userReducer'

export default function RegistrationPage() {
  // const username = React.useRef<HTMLInputElement>(null)
  // const password = React.useRef<HTMLInputElement>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      if (username.length >= 3 && password.length >= 6) {
        await dispatch(fetchRegistration({ username, password }))
        setError('')
        navigate(MAIN_ROUTE)
        // console.log(newUser)
      }
      // const newUser = await registration(
      //   username.current.value,
      //   password.current.value
      // )
      // console.log(newUser)
    } catch (e) {
      setError(e.response.data.message)
      console.log(e.response.data.message)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Регистрация</h3>
        </div>
        <div className={styles.loginRight}>
          <form className={styles.loginBox} onSubmit={handleClick}>
            <input
              placeholder="Username"
              // ref={username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.loginInput}
              minLength={3}
            />
            <input
              placeholder="Password"
              // ref={password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
              type={showPassword ? 'text' : 'password'}
              minLength={6}
            />
            <text
              className={styles.showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            </text>
            <button type="submit" className={styles.loginButton}>
              Зарегистрироваться
            </button>
            <div className={styles.divLink}>
              <Link
                onClick={() => navigate(LOGIN_ROUTE)}
                className={styles.link}
              >
                Есть аккаунт? Авторизуйтесь
              </Link>
            </div>
            <div>{error}</div>
          </form>
        </div>
      </div>
    </div>
  )
}
