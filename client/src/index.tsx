import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App/App'
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from './App/Redux/store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)

const store = setupStore()

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
