import React from 'react'
import styled from 'styled-components'

import Card from 'components/card'
import Text from 'components/text'

const Wrapper = styled.div`
`

const Project = ({
  actions,
  data: project
}) => {
  return (
    <Card highlighted>
      <Card.Header>
        <Text.SectionTitle>{project.name}</Text.SectionTitle>
        {actions.map((action, index) => {
          return (
            <Card.HeaderAction key={index} onClick={action.onClick}>
              {action.icon}
            </Card.HeaderAction>
          )
        })}
      </Card.Header>
      <Card.Content>
        <h1>xxx</h1>
      </Card.Content>
    </Card>
  )
}

export default Project
