import React from 'react'
import {
  createBrowserRouter,
  defer,
  Await,
  RouterProvider
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import Login from './login'
import AuthRoutes from './containers/auth'
import Root from './containers/root'
import Timesheet from './containers/timesheet'

const delay = (time, value) => new Promise((resolve) => {
  setTimeout(() => resolve(value), time)
})

const auth = (loader) => () => {
  console.log('auth loader')

  return defer({
    user: delay(5000, {email: 'longlh@2-b.io'})
  })
}


const router = createBrowserRouter([{
  path: '/',
  element: <AuthRoutes />,
  // errorElement: <h1>Error</h1>,
  children: [{
    index: true,
    loader: auth(),
    element: <Root />
  }, {
    path: 'timesheet',
    element: <Timesheet />
  }]
}, {
  path: '/login',
  element: <Login />
}])

const App = () => {
  return (
    <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
