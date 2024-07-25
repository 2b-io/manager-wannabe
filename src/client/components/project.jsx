import prettyMilliseconds from 'pretty-ms'
import React from 'react'
import {FiMeh} from 'react-icons/fi'
import styled from 'styled-components'

import Badge from 'components/badge'
import Card from 'components/card'
import Grid from 'components/grid'
import List from 'components/list'
import Text from 'components/text'

const Circle = styled.div`
  border-radius: 1.5rem;
  height: 3rem;
  width: 3rem;
  overflow: hidden;
  background: whitesmoke;
  outline: 2px solid whitesmoke;
`

const Avatar = ({data: user}) => {
  const picture = user.profiles?.google?.picture

  const avatar = picture ? (
    <img src={picture} width={24} height={24} />
  ) : (
    <FiMeh size={24} />
  )

  return (
    <Circle title={user.profiles?.google?.displayName}>{avatar}</Circle>
  )
}

const formatDuration = (s) => prettyMilliseconds(s * 1e3, {
  compact: true
})

const Project = ({
  actions = [],
  data: project
}) => {
  return (
    <Card highlighted>
      <Card.Header>
        <Text.SectionTitle>{project.name}</Text.SectionTitle>
        {actions.map((action, index) => {
          return (
            <Card.HeaderAction
              key={index}
              onClick={action.onClick}
              title={action.title}>
              {action.icon}
            </Card.HeaderAction>
          )
        })}
      </Card.Header>
      <Card.Content>
        <Grid fullWidth>
          <List>
            <List.Item>
              <Badge>{project.status}</Badge>
            </List.Item>
          </List>
          <List>
            {project.participants.map((user) => (
              <List.Item key={user.email}>
                <Avatar data={user} />
              </List.Item>
            ))}
            {project.totalSpentAsSeconds && (
              <List.Item last>
                <Text>
                  Spent {formatDuration(project.totalSpentAsSeconds)} 
                </Text>
              </List.Item>
            ) || null}
          </List>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default Project
