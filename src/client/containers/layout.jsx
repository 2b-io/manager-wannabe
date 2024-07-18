import React, {
  useEffect,
  useState
} from 'react'
import {
  Link,
  Navigate,
  Outlet
} from 'react-router-dom'

import Button from 'components/button'

const Layout = () => {
  return (
    <div>
      <ul>
        <li><Button as={Link} to="/">Dashboard</Button></li>
        <li><Button as={Link} to="/timesheet/100">Timesheet</Button></li>
        <li><Button as="a" href="/auth/logout">Logout</Button></li>
      </ul>
      <Outlet />
    </div>
  )
}

export default Layout
