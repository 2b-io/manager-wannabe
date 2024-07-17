import React from 'react'
import {
  Await,
  Link as RouterLink,
  Outlet,
  useLoaderData
} from 'react-router-dom'
import {
  Link
} from '@mui/material'

const Root = () => {
  const data = useLoaderData()

  console.log('Root', data)

  return (
    <React.Suspense>
      <Await resolve={data.user}>
        {(user) => (
          <h1>Hello {user.email}</h1>
        )}
      </Await>
    </React.Suspense>
  )
}

export default Root
