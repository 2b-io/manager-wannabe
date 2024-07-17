import React from 'react'
import {
  createBrowserRouter,
  defer,
  useLoaderData,
  Await,
  Navigate,
  Outlet,
  RouterProvider
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import Login from './login'
import Layout from './containers/layout'
import Root from './containers/root'
import Timesheet from './containers/timesheet'

const fetchUser = async () => {
  try {
    const res = await fetch('/api/users/me')
    const user = await res.json()

    return user
  } catch (e) {
    return null
  }
}

const authLoader = () => {
  console.log('auth loader')

  return defer({
    user: fetchUser()
  })
}

const ProtectedRoute = () => {
  const data = useLoaderData()

  return (
    <React.Suspense>
      <Await
        resolve={data.user}
        errorElement={
          <h1>Fetch user failed!</h1>
        }>
        {(user) => user ? (
          <Outlet context={{user}} />
        ) : <Navigate to="/login" replace={true} />}
      </Await>
    </React.Suspense>
  )
}

const createProtectedRoute = (route) => ({
  path: route.path,
  loader: authLoader,
  element: <ProtectedRoute />,
  children: [{
    ...route,
    // index: true,
    path: undefined
  }]
})

const router = createBrowserRouter([createProtectedRoute({
  path: '/',
  element: <Layout />,
  // errorElement: <h1>Error</h1>,
  children: [createProtectedRoute({
    index: true,
    element: <Root />
  }), createProtectedRoute({
    index: true,
    path: 'timesheet/:id',
    element: <Timesheet />
  })]
}), {
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
