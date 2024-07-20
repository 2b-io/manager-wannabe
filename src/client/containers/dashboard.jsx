import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useOutletContext} from 'react-router-dom'

import {project} from 'state/actions'

const Dashboard = () => {
  const {user} = useOutletContext()
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.project.projects)

  useEffect(() => {
    dispatch(project.add({
      projects: [{
        id: 1,
        name: 'Mobile Commerce'
      }, {
        id: 2,
        name: 'Rebuild Website'
      }]
    }))
  }, [])

  return (
    <React.Fragment>
      <h1>Hello {user.email}</h1>
      <ul>
        {Object.entries(projects).map(([id, project]) => {
          return (
            <li key={id}>{project.name}</li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default Dashboard
