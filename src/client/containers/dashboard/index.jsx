import React, {
  useEffect,
  useState
} from 'react'
import {FiClock} from 'react-icons/fi'
import {FiStar} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'

import Card from 'components/card'
import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import Modal from 'components/modal'
import Text from 'components/text'
import TimelogForm from 'components/timelog-form'
import {timelog} from 'state/actions'

import Project from './project'

const FavoriteProjects = ({projects, onProjectRender}) => {
  if (!projects || !projects.length) {
    return (
      <EmptyState>
        <Text>You didn't star any projects yet.</Text>
      </EmptyState>
    )
  }

  return (
    <ProjectList projects={projects} onProjectRender={onProjectRender} />
  )
}

const ProjectList = ({projects, onProjectRender}) => {
  return (
    <Grid>
      {projects.map(onProjectRender)}
    </Grid>
  )
}

const Dashboard = () => {
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.project.projects)
  const [timeLogFor, setTimeLogFor] = useState()

  return (
    <Grid fullWidth space="loose">
      <Grid>
        <Card loose>
          <Card.Header>
            <Text.PageTitle>Timelog Analysis</Text.PageTitle>
          </Card.Header>
          <Card.Content>
            <EmptyState>
              <Text>Coming Soon.</Text>
            </EmptyState>
          </Card.Content>
        </Card>
        <Card loose>
          <Card.Header>
            <Text.PageTitle>Starred Projects</Text.PageTitle>
          </Card.Header>
          <Card.Content>
            <FavoriteProjects projects={[]}
              onProjectRender={(project) => {
                return (
                  <Project key={project._id} data={project} />
                )
              }}
            />
          </Card.Content>
        </Card>
      </Grid>
      <Card loose>
        <Card.Header>
          <Text.PageTitle>All Projects</Text.PageTitle>
        </Card.Header>
        <Card.Content>
          <ProjectList projects={Object.values(projects)}
            onProjectRender={(project) => {
              return (
                <Project
                  key={project._id}
                  data={project}
                  actions={[{
                    icon: <FiClock />,
                    onClick: () => setTimeLogFor(project._id)
                  // }, {
                  //   icon: <FiStar />,
                  //   onClick: () => console.log('Starred')
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
                spent: ''
              }}
              onSubmit={(data) => {
                dispatch(timelog.create(data))
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
