import React, {
  useEffect,
  useState
} from 'react'
import {
  Link as RouterLink,
  Navigate,
  Outlet
} from 'react-router-dom'
import {
  Link
} from '@mui/material'

const AuthRoutes = () => {
  useEffect(() => {
    console.log('AuthRoutes loaded.')
  })

  return (
    <React.Fragment>
      <ul>
        <li><Link component={RouterLink} to="/">Dashboard</Link></li>
        <li><Link component={RouterLink} to="/timesheet">Timesheet</Link></li>
        <li><Link component={RouterLink} to="/login">Login</Link></li>
      </ul>
      <Outlet />
    </React.Fragment>
  )
}

export default AuthRoutes
