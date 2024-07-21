import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useOutletContext} from 'react-router-dom'

import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import {project} from 'state/actions'

import {FiClock} from 'react-icons/fi';
import {FiStar} from 'react-icons/fi'

import Project from './project'

const FavoriteProjects = ({projects, onProjectRender}) => {
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
  const {user} = useOutletContext()
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.project.projects)

  useEffect(() => {
    dispatch(project.add({
      projects: [{
        id: 3,
        name: ' Mobile CommerceMobile CommerceMobile CommerceMobile CommerceMobile CommerceMobile CommerceMobile Commerce'
      }, {
        id: 4,
        name: 'Rebuild Website'
      }]
    }))
  }, [])

  return (
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
                onClick: () => console.log('Log Time')
              }, {
                icon: <FiStar />,
                onClick: () => console.log('Starred')
              }]}
            />
          )
        }}
      />
    </Grid>
  )
}

export default Dashboard
