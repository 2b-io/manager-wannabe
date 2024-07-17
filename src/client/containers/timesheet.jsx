import React from 'react'
import {useParams} from 'react-router-dom'

const Timesheet = () => {
  const data = useParams()

  return (
    <h1>Timesheet {data.id}</h1>
  )
}

export default Timesheet
