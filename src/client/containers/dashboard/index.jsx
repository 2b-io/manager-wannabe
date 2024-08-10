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
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  Link as RouterLink,
  useOutletContext
} from 'react-router-dom'
import {createSelector} from 'reselect'

import Button from 'components/button'
import Card from 'components/card'
import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import Modal from 'components/modal'
import Text from 'components/text'
import TimelogForm from 'components/timelog-form'

import Project from 'components/project'
import {
  project as projectAction,
  timelog as timelogAction,
  ui as uiAction
} from 'state/actions'

import hashService from 'services/hash'

import TimelogSummary from './timelog-summary'

const selectProjectsByParams = createSelector([
  (state) => state.project.projects,
  (state, params, salt) => state.ui.dataBindings[hashService.obj(params, salt)]
], (projects, dataBinding) => {
  const data = dataBinding?.data || {}

  return {
    ...data,
    projects: (data.ids || []).map((id) => projects[id])
  }
})

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

const Dashboard = () => {
  const {user} = useOutletContext()
  const [params, setParams] = useState({
    skip: 0,
    limit: 50,
    starred: true
  })
  const [timeLogFor, setTimeLogFor] = useState()

  const data = useSelector((state) => selectProjectsByParams(state, params))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiAction.queryProjects(params))
  }, [params])

  return (
    <Grid fullWidth space="loose">
      <TimelogSummary />
      
      <Card loose>
        <Card.Header>
          <Text.PageTitle>Starred Projects</Text.PageTitle>
        </Card.Header>
        <Card.Content>
          <ProjectList projects={data.projects}
            onEmpty={() => (
              <EmptyState>
                <RouterLink to="/projects">
                  <Text>You didn't star any projects yet. Star some!</Text>
                </RouterLink>
              </EmptyState>
            )}
            onProjectRender={(project) => {
              return (
                <Project
                  key={project._id}
                  data={project}
                  actions={[{
                    title: "Log Time",
                    icon: <FiClock />,
                    onClick: () => setTimeLogFor(project)
                  }, {
                    title: "Toggle Star",
                    icon: project.starred ? <FiStar fill="black" /> : <FiStar />,
                    onClick: () => dispatch(projectAction.toggleStar({
                      projectId: project._id,
                      refetch: params
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
                dispatch(uiAction.createTimelog(data))
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

export default Dashboard
