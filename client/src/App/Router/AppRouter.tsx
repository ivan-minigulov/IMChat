import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes, authRoutes } from './routes'
import { LOGIN_ROUTE, MAIN_ROUTE } from './consts'
import { useAppSelector } from '../Redux/hooks'

export default function AppRouter() {
  const username = useAppSelector((state) => state.userReduser.user.username)
  return (
    <Routes>
      {username &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route
        path="*"
        element={<Navigate to={username ? MAIN_ROUTE : LOGIN_ROUTE} />}
      />
    </Routes>
  )
}
