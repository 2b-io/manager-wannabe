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

import Project from 'components/project'

import {
  project as projectAction,
  timelog as timelogAction,
  ui as uiAction
} from 'state/actions'

import hashService from 'services/hash'

const PAGE_SIZE = 10

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

const selectProjectsByParams = createSelector([
  (state) => state.project.projects,
  (state, params, salt) => state.ui.dataBindings[hashService.obj(params, salt)]
], (projects, dataBinding) => {
  const data = dataBinding?.data || {}

  console.log('selector', data)

  return {
    ...data,
    projects: (data.ids || []).map((id) => projects[id])
  }
})

const Projects = () => {
  const {user} = useOutletContext()
  const [timeLogFor, setTimeLogFor] = useState()
  const [skip, setSkip] = useState(0)

  const data = useSelector((state) => selectProjectsByParams(state, {
    skip,
    limit: PAGE_SIZE
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('params changed', skip)

    dispatch(uiAction.fetchProjects({
      skip,
      limit: PAGE_SIZE
    }))
  }, [skip])

  // pagination logic
  const canPrev = data?.params?.skip > 0
  const canNext = data?.params?.skip + PAGE_SIZE < data?.total

  return (
    <Grid fullWidth space="loose">
      <Card loose>
        <Card.Header>
          <Text.PageTitle>All Projects</Text.PageTitle>
          <Card.HeaderAction disabled={!canPrev}
            onClick={() => setSkip(Math.max(0, skip - 10))}>
            <FiChevronLeft />
          </Card.HeaderAction>
          <Card.HeaderAction disabled={!canNext}
            onClick={() => setSkip(skip + 10)}>
            <FiChevronRight />
          </Card.HeaderAction>
        </Card.Header>
        <Card.Content>
          <ProjectList projects={data.projects}
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
