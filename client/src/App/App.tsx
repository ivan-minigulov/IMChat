import React, { useEffect } from 'react'
import Navbar from '../Widgets/Navbar/Navbar'
import './App.css'
import AppRouter from './Router/AppRouter'
import { useAppDispatch } from './Redux/hooks'
import { fetchCheckAuth } from './Redux/Reducers/userReducer'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCheckAuth())
  }, [dispatch])

  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  )
}

export default App
