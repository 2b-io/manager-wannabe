import React, {
  useEffect,
  useState
} from 'react'
import {FiClock} from 'react-icons/fi'
import {FiStar} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'

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
    <Grid fullWidth loose>
      <Grid>
        <Grid fullWidth>
          <Text.PageTitle>Timelog Analysis</Text.PageTitle>
          <EmptyState>
            <Text>Coming Soon.</Text>
          </EmptyState>
        </Grid>
        <Grid fullWidth>
          <Text.PageTitle>Starred Projects</Text.PageTitle>
          <FavoriteProjects projects={[]}
            onProjectRender={(project) => {
              return (
                <Project key={project._id} data={project} />
              )
            }}
          />
        </Grid>
      </Grid>
      <Grid fullWidth>
        <Text.PageTitle>All Projects</Text.PageTitle>
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
      </Grid>
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
