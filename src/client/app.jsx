import React from 'react'
import {
  Provider as StateProvider
} from 'react-redux'
import {
  createBrowserRouter,
  defer,
  useLoaderData,
  Await,
  Navigate,
  Outlet,
  RouterProvider
} from 'react-router-dom'

import GlobalStyle from './global-style'

import Login from './containers/login'
import Layout from './containers/layout'
import Dashboard from './containers/dashboard'
import Projects from './containers/projects'
import Timesheet from './containers/timesheet'

import store from './state/store'
import {
  project,
  timelog,
  ui
} from './state/actions'

const fetchUser = async () => {
  try {
    const res = await fetch('/api/users/me')
    const user = await res.json()

    return user
  } catch (e) {
    return null
  }
}

const authLoader = () => defer({
  user: fetchUser()
})

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
  errorElement: route.errorElement,
  element: <ProtectedRoute />,
  children: [{
    ...route,
    // index: true,
    path: undefined,
    errorElement: undefined
  }]
})

const router = createBrowserRouter([createProtectedRoute({
  path: '/',
  element: <Layout />,
  // errorElement: <Navigate to="/" />,
  children: [createProtectedRoute({
    index: true,
    element: <Dashboard />,
    loader: () => {
      // store.dispatch(project.fetch())
      // store.dispatch(timelog.fetch())

      return null
    }
  }), createProtectedRoute({
    index: true,
    path: 'timesheet',
    element: <Timesheet />,
    loader: () => {
      // store.dispatch(project.fetch())
      // store.dispatch(timelog.fetch())

      return null
    }
  }), createProtectedRoute({
    index: true,
    path: 'projects',
    element: <Projects />
  })]
}), {
  path: '/login',
  exact: true,
  element: <Login />
}])

const App = () => {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <StateProvider store={store}>
        <RouterProvider router={router} />
      </StateProvider>
    </React.StrictMode>
  )
}

export default App
