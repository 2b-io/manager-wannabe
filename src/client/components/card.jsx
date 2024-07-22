import React from 'react'
import styled from 'styled-components'

const Card = styled(({highlighted, ...props}) => <div {...props} />)`
  border-radius: 1rem;
  overflow: hidden;
  ${({highlighted}) => highlighted && `
    outline: 2px solid whitesmoke;
  `}
`

Card.Header = styled.div`
  display: flex;
  padding: 1rem 2rem;
  line-height: 4rem;
  background: whitesmoke;

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

Card.HeaderAction = styled.button`
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

Card.Content = styled.div`
  padding: 1rem 2rem 2rem;
`

export default Card
