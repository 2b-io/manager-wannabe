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

import Button from 'components/button'
import Card from 'components/card'
import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import Modal from 'components/modal'
import Project from 'components/project'
import Text from 'components/text'
import TimelogForm from 'components/timelog-form'

import {
  project as projectAction,
  timelog as timelogAction
} from 'state/actions'

import hash from 'services/hash'

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

const Projects = () => {
  const dispatch = useDispatch()
  const queries = useSelector((state) => state.project.queries)

  const {user} = useOutletContext()
  const [timeLogFor, setTimeLogFor] = useState()
  const [params, setParams] = useState({
    skip: 0,
    limit: 5
  })
  const [projects, setProjects] = useState([])

  useEffect(() => {
    dispatch(projectAction.fetch(params))
  }, [params])

  useEffect(() => {
    const queryHash = hash.obj(params)

    if (!queryHash || !queries[queryHash]) {
      return
    }

    setProjects(queries[queryHash])
  }, [params, queries])

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

export default Projects
