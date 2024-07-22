import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  padding: 1rem 2rem;
  line-height: 4rem;
  background: whitesmoke;

  & > *:first-child {
    flex-grow: 1;
    flex-shrink: 1;
  }

  & > *:first-child:not(:last-child) {
    margin-right: 2rem;
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

const Card = styled(
  ({highlighted, loose, ...props}) => <div {...props} />
)`
  ${({highlighted}) => highlighted && `
    outline: 2px solid whitesmoke;
  `}

  ${({loose}) => loose ? `
    display: flex;
    flex-direction: column;
    grid-gap: 2rem;

    & > ${Header} {
      padding: 0;
      background: transparent;
    }

    & > ${Content} {
      padding: 0;
    }
  ` : `
    border-radius: 1rem;
    overflow: hidden;
  `}
`

Card.HeaderAction = HeaderAction
Card.Header = Header
Card.Content = Content

export default Card
