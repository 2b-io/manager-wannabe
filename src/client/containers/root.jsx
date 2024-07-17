import React from 'react'
import {useOutletContext} from 'react-router-dom'

const Root = () => {
  const {user} = useOutletContext()

  return (
    <h1>Hello {user.email}</h1>
  )
}

export default Root
