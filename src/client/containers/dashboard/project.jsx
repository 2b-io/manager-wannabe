import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  border-radius: 1rem;
  background: whitesmoke;
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  padding: 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid #333;
  }

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

const HeaderAction = styled.button`
  appearance: none;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: transparent;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`

const Content = styled.div`
  padding: 2rem;
`

const Project = ({
  actions,
  data: project
}) => {
  return (
    <Card>
      <Header>
        <h2>{project.name}</h2>
        {actions.map((action, index) => {
          return (
            <HeaderAction key={index} onClick={action.onClick}>
              {action.icon}
            </HeaderAction>
          )
        })}
      </Header>
    </Card>
  )
}

export default Project
