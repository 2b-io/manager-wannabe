import React, {
  useEffect
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {useParams} from 'react-router-dom'

import Grid from 'components/grid'
import Text from 'components/text'

import {
  ui as uiAction,
} from 'state/actions'

export default () => {
  const {projectId} = useParams()
  const project = useSelector((state) => state.project.projects[projectId])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiAction.getProject({
      id: projectId
    }))
  }, [])

  if (!project) {
    return null
  }

  return (
    <Grid fullWidth space="loose">
      <Text.PageTitle>{project.name}</Text.PageTitle>
    </Grid>
  )
}
