import React from 'react'
import {FiMeh} from 'react-icons/fi'
import styled from 'styled-components'

import Badge from 'components/badge'
import Card from 'components/card'
import Grid from 'components/grid'
import Text from 'components/text'

const List = styled.ul`
  display: flex;
  grid-gap: 1rem;
`

List.Item = styled.li`
  display: flex;
`

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

  return <Circle>{avatar}</Circle>
}

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
        <Grid fullWidth>
          <List>
            <List.Item>
              <Badge>{project.status}</Badge>
            </List.Item>
          </List>
          <List>
            {project.sales.map((user) => (
              <List.Item key={user.email}>
                <Avatar data={user} />
              </List.Item>
            ))}
          </List>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default Project
