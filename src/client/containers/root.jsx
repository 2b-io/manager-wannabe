import React from 'react'
import {
  Link as RouterLink,
  Outlet,
  useRouteLoaderData
} from 'react-router-dom'
import {
  Link
} from '@mui/material'

const Root = () => {
  const data = useRouteLoaderData('root')

  console.log('Root', data)

  return (
    <React.Fragment>
      <h1>Root</h1>
      <ul>
        <li><Link component={RouterLink} to="/">Home</Link></li>
        <li><Link component={RouterLink} to="/login">Login</Link></li>
      </ul>
      <Outlet />
    </React.Fragment>
  )
}

export default Root
