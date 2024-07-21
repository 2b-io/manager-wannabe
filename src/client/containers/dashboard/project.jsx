import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  border-radius: 2rem;
  background: whitesmoke;
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  grid-gap: 2rem;

  & > *:first-child {
    flex-grow: 1;
    flex-shrink: 1;
  }

  & > * {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Project = ({data: project}) => {
  return (
    <Card>
      <Header>
        <h2>{project.name}</h2>
        <button>Star</button>
      </Header>
    </Card>
  )
}

export default Project
