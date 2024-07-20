import React from 'react'
import styled from 'styled-components'
import logo from './2b-logo-2020-10-circle.png'

const Container = styled.div`
  max-width: 50rem;
  height: 50rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Logo = styled.img`
  width: 20rem;
  height: 20rem;
  padding: 5rem;
`

const LoginButton = styled.a`
  width: 30rem;
  height: 5rem;
  line-height: 5rem;
  border-radius: 2rem;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  background: black;
  color: white;

`

const LoginLayout = ({ loginUrl }) => {
  return (
    <Container>
      <Logo src={logo} />
      <LoginButton href={loginUrl}>Login with Google</LoginButton>
    </Container>
  )
}

export default LoginLayout
