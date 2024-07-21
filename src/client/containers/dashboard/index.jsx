import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useOutletContext} from 'react-router-dom'

import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import {project} from 'state/actions'

import Project from './project'

const FavoriteProjects = ({projects}) => {
  if (!projects || !projects.length) {
    return (
      <EmptyState>
        <p>You didn't favor any projects yet.</p>
        <p>Please consider add some for quick accessing.</p>
      </EmptyState>
    )
  }

  return (
    <ProjectList projects={projects} />
  )
}

const ProjectList = ({ projects, actions }) => {
  return (
    <Grid>
      {projects.map((project) => <Project key={project.id} data={project} />)}
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
      <FavoriteProjects projects={[]} />
      <ProjectList projects={Object.values(projects)} />
    </Grid>
  )
}

export default Dashboard
