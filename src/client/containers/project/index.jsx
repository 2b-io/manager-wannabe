import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import Project from 'components/project'

export default ({
  actions
}) => {
  const {projectId} = useParams()

  return <div>{projectId}</div>
}
