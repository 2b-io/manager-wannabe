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
import StatusFiltering from './status-filtering'

import {
  project as projectAction,
  timelog as timelogAction,
  ui as uiAction
} from 'state/actions'

import hashService from 'services/hash'

const PAGE_SIZE = 10
const VALID_STATUSES = [
  'OPEN',
  'IN_CONVERSATION',
  'NEED_ESTIMATE',
  'HAS_ESTIMATE',
  'FOLLOW_UP',
  'IN_DEVELOPMENT',
  'IN_WARRANTY',
  'CLOSED_WON',
  'CLOSED_LOST'
]

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

  return {
    ...data,
    projects: (data.ids || []).map((id) => projects[id])
  }
})

const Projects = () => {
  const {user} = useOutletContext()
  const [timeLogFor, setTimeLogFor] = useState()
  const [params, setParams] = useState({
    skip: 0,
    limit: PAGE_SIZE,
    status: ['IN_DEVELOPMENT']
  })

  const data = useSelector((state) => selectProjectsByParams(state, params))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiAction.queryProjects(params))
  }, [params])

  // pagination logic
  const canPrev = data?.params?.skip > 0
  const canNext = data?.params?.skip + PAGE_SIZE < data?.total

  const prev = () => {
    setParams({
      ...params,
      skip: Math.max(0, params.skip - PAGE_SIZE)
    })
  }

  const next = () => {
    setParams({
      ...params,
      skip: params.skip + PAGE_SIZE
    })
  }

  const toggleStatus = (status) => {
    const map = new Set(params.status)

    if (map.has(status)) {
      map.delete(status)
    } else {
      map.add(status)
    }

    const selected = Array.from(map.values()).sort()

    setParams({
      ...params,
      skip: 0,
      status: selected
    })
  }

  const paginationStatus = data.params ?
    `Display ${data.params.skip + 1} - ${Math.min(data.params.skip + data.params.limit, data.total)} of ${data.total}` :
    null

  return (
    <Grid fullWidth space="loose">
      <Card loose>
        <Card.Header>
          <Text.PageTitle>All Projects</Text.PageTitle>
          <Card.HeaderAction disabled={!canPrev}
            onClick={prev}>
            <FiChevronLeft />
          </Card.HeaderAction>
          <Card.HeaderAction disabled={!canNext}
            onClick={next}>
            <FiChevronRight />
          </Card.HeaderAction>
        </Card.Header>
        <Card.Content>
          <Grid fullWidth>
            <StatusFiltering
              selected={params.status}
              all={VALID_STATUSES}
              onSelect={toggleStatus}
            />
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
            <Text>{paginationStatus}</Text>
          </Grid>
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

export default React.memo(Projects)
