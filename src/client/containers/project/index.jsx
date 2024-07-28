import React from 'react'
import {useSelector} from 'react-redux'

import Project from 'components/project'

export default ({
  actions,
  data: projectId
}) => {
  const project = useSelector((state) => state.project.projects[projectId])

  return <Project actions={actions} data={project} />
}
