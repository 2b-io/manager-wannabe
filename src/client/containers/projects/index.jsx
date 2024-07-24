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
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.project.projects)

  const {user} = useOutletContext()
  const [timeLogFor, setTimeLogFor] = useState()

  const allProjects = Object.values(projects)
  const starredProjects = allProjects.filter((project) => project.starred)

  return (
    <Grid fullWidth space="loose">
      <Card loose>
        <Card.Header>
          <Text.PageTitle>All Projects</Text.PageTitle>
        </Card.Header>
        <Card.Content>
          <ProjectList projects={allProjects}
            onProjectRender={(project) => {
              return (
                <Project
                  key={project._id}
                  data={project}
                  actions={[{
                    title: "Log Time",
                    icon: <FiClock />,
                    onClick: () => setTimeLogFor(project._id)
                  }, {
                    title: "Toggle Star",
                    icon: project.starred ? <FiStar fill="black" /> : <FiStar />,
                    onClick: () => dispatch(projectAction.toggleStar(project._id))
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
              projects={projects}
              initialData={{
                projectId: timeLogFor,
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

export default Dashboard
