import React from 'react'
import styled from 'styled-components'

import Card from 'components/card'

const Wrapper = styled.div`
  background: whitesmoke;
`

const Project = ({
  actions,
  data: project
}) => {
  return (
    <Wrapper>
      <Card>
        <Card.Header>
          <h2>{project.name}</h2>
          {actions.map((action, index) => {
            return (
              <Card.HeaderAction key={index} onClick={action.onClick}>
                {action.icon}
              </Card.HeaderAction>
            )
          })}
        </Card.Header>
      </Card>
    </Wrapper>
  )
}

export default Project
