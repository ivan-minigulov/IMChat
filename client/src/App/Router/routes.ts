import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from './consts'
import MainPage from '../../Pages/Main/MainPage'
import LoginPage from '../../Pages/Login/LoginPage'
import RegistrationPage from '../../Pages/Registration/RegistrationPage'

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage,
  },
]
