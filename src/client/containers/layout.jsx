import React from 'react'
import {
  Link,
  Outlet
} from 'react-router-dom'
import styled from 'styled-components'

import Button from 'components/button'
import Container from 'components/container'

const Main = styled.main`

`

const Nav = styled.nav`
  background: black;
  color: white;
`

const Menu = styled(Container)`
  display: flex;
`

Menu.Item = styled.div`
  &:not(:last-child) {
    margin-right: 2rem;
  }

  &:last-child {
    margin-left: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

const Layout = () => {
  return (
    <Main>
      <Nav>
        <Menu>
          <Menu.Item>
            <Button as={Link} to="/">Dashboard</Button>
          </Menu.Item>
          <Menu.Item>
            <Button as={Link} to="/timesheet/100">Timesheet</Button>
          </Menu.Item>
          <Menu.Item>
            <Button as="a" href="/auth/logout">Logout</Button>
          </Menu.Item>
        </Menu>
      </Nav>
      <Container>
        <Outlet />
      </Container>
    </Main>
  )
}

export default Layout
