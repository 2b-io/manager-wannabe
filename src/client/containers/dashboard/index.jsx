import React, {
  useEffect,
  useState
} from 'react'
import {FiClock} from 'react-icons/fi'
import {FiStar} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'

import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import {project} from 'state/actions'

import Project from './project'
import TimeLog from './time-log'

const FavoriteProjects = ({projects, onProjectRender}) => {
  return null

  if (!projects || !projects.length) {
    return (
      <EmptyState>
        <p>You didn't favor any projects yet.</p>
        <p>Please consider add some for quick accessing.</p>
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
  const [timeLogFor, setTimeLogFor] = useState(1)

  return (
    <React.Fragment>
      <Grid fullWidth>
        <FavoriteProjects projects={[]}
          onProjectRender={(project) => {
            return (
              <Project key={project.id} data={project} />
            )
          }}
        />
        <ProjectList projects={Object.values(projects)}
          onProjectRender={(project) => {
            return (
              <Project
                key={project.id}
                data={project}
                actions={[{
                  icon: <FiClock />,
                  onClick: () => setTimeLogFor(project.id)
                }, {
                  icon: <FiStar />,
                  onClick: () => console.log('Starred')
                }]}
              />
            )
          }}
        />
      </Grid>
      {timeLogFor && (
        <TimeLog
          projects={projects}
          initialProjectId={timeLogFor}
          onCloseClick={() => setTimeLogFor(null)}
          onOutsideClick={() => setTimeLogFor(null)}
          onSubmit={(timeLog) => console.log(timeLog)}
        />
      )}
    </React.Fragment>
  )
}

export default Dashboard
