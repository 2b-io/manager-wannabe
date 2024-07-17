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

const Layout = () => {
  useEffect(() => {
    console.log('Layout loaded.')
  })

  return (
    <React.Fragment>
      <ul>
        <li><Link component={RouterLink} to="/">Dashboard</Link></li>
        <li><Link component={RouterLink} to="/timesheet/100">Timesheet</Link></li>
        <li><Link href="/auth/logout">Logout</Link></li>
      </ul>
      <Outlet />
    </React.Fragment>
  )
}

export default Layout
