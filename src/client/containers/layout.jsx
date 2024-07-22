import React from 'react'
import {
  Link,
  Outlet
} from 'react-router-dom'
import styled from 'styled-components'

import Button from 'components/button'
import Container from 'components/container'

const Nav = styled.nav`
  background: black;
  color: white;
`

const Menu = styled(Container)`
  display: flex;
  grid-gap: 2rem;
`

Menu.Item = styled.div`
  &:last-child {
    margin-left: auto;
    text-align: right;
  }

  a {
    background: transparent;
    color: inherit;
    line-height: 4rem;
    text-decoration: none;
    min-width: auto;
  }
`

const Layout = () => {
  return (
    <React.Fragment>
      <Nav>
        <Menu>
          <Menu.Item>
            <Button as={Link} to="/">Dashboard</Button>
          </Menu.Item>
          <Menu.Item>
            <Button as={Link} to="/timesheet">Timesheet</Button>
          </Menu.Item>
          <Menu.Item>
            <Button as="a" href="/auth/logout">Logout</Button>
          </Menu.Item>
        </Menu>
      </Nav>
      <Container>
        <Outlet />
      </Container>
    </React.Fragment>
  )
}

export default Layout
