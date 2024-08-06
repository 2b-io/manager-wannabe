import React, {
  useEffect,
  useState
} from 'react'
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiStar
} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'
import {useOutletContext} from 'react-router-dom'
import {createSelector} from 'reselect'

import Button from 'components/button'
import Card from 'components/card'
import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import Modal from 'components/modal'
import Text from 'components/text'
import TimelogForm from 'components/timelog-form'

import Project from '../project'

import {
  project as projectAction,
  timelog as timelogAction,
  ui as uiAction
} from 'state/actions'

import hashService from 'services/hash'

const selector = createSelector([
  (state) => state.project.projects,
  (state) => state.ui.dataBindings
], (projects, timelogs) => ({
  projects,
  timelogs: Object.values(timelogs).sort((a, b) => new Date(b.date) - new Date(a.date))
}))

const ProjectList = ({projects, onEmpty, onProjectRender}) => {
  if (!projects || !projects.length) {
    return onEmpty ? onEmpty() : null
  }

  return (
    <Grid>
      {projects.map(onProjectRender)}
    </Grid>
  )
}

const selectProjects = (state) => state.project.projects
const selectDataBinding = (params) => (state) => state.ui.dataBindings[hashService.obj(params)]

const Projects = () => {
  const {user} = useOutletContext()
  const [timeLogFor, setTimeLogFor] = useState()
  const [params, setParams] = useState({
    skip: 0,
    limit: 5
  })

  const dispatch = useDispatch()
  const projects = useSelector(createSelector([
    selectProjects,
    selectDataBinding(params)
  ], (projects, dataBinding) => {
    const data = dataBinding?.data || []

    console.log('data', data)

    return data.map((id) => projects[id])
  }))

  useEffect(() => {
    dispatch(uiAction.fetchProjects(params))
  }, [params])

  return (
    <Grid fullWidth space="loose">
      <Card loose>
        <Card.Header>
          <Text.PageTitle>All Projects</Text.PageTitle>
        </Card.Header>
        <Card.Content>
          <ProjectList projects={projects}
            onProjectRender={(project) => {
              return (
                <Project
                  key={project._id}
                  data={project._id}
                  actions={[{
                    title: "Log Time",
                    icon: <FiClock />,
                    onClick: () => setTimeLogFor(project)
                  }, {
                    title: "Toggle Star",
                    icon: project.starred ? <FiStar fill="black" /> : <FiStar />,
                    onClick: () => dispatch(projectAction.toggleStar({
                      projectId: project._id
                    }))
                  }]}
                />
              )
            }}
          />
        </Card.Content>
      </Card>
      {timeLogFor && (
        <Modal
          title="Log Time"
          component={(
            <TimelogForm
              project={timeLogFor}
              initialData={{
                projectId: timeLogFor._id,
                date: new Date(),
                spent: '',
                workType: user.defaultWorkType
              }}
              onSubmit={(data) => {
                dispatch(timelogAction.create(data))
                setTimeLogFor(null)
              }}
            />
          )}
          onCloseClick={() => setTimeLogFor(null)}
          onOutsideClick={() => setTimeLogFor(null)}
        />
      )}
    </Grid>
  )
}

export default React.memo(Projects)
