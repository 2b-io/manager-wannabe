import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import Login from './login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello World</h1>,
    errorElement: <h1>Error</h1>
  },
  {
    path: '/login',
    element: <Login />
  }
])

const App = () => {
  return (
    <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
