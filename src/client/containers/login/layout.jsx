import React from 'react'
import styled from 'styled-components'

const Container = styled.main`
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;

`

const LoginLayout = ({ loginUrl }) => {
  return (
    <Container>
      <a href={loginUrl}>Login with Google</a>
    </Container>
  )
}

export default LoginLayout
