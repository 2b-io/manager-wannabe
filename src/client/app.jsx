import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import Login from './login'
import Root from './containers/root'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: async () => {
      const res = await fetch('/api/users/me')
      const user = await res.json() 

      return {
        user
      }
    },
    shouldRevalidate: () => true,
    element: <Root />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: 'login',
        element: <Login />
      }
    ]
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
