import React from 'react'
import {useOutletContext} from 'react-router-dom'

const Dashboard = () => {
  const {user} = useOutletContext()

  return (
    <h1>Hello {user.email}</h1>
  )
}

export default Dashboard
