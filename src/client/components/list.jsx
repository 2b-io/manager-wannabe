import React from 'react'
import styled from 'styled-components'

const List = styled(({space, ...props}) => <ul {...props} />)`
  display: flex;
  width: 100%;

  ${({space}) => {
    switch (space) {
      case 'loose':
        return `grid-gap: 2rem;`
      default:
        return `grid-gap: 0rem;`
    }
  }}
`

List.Item = styled(({last, ...props}) => <li {...props} />)`
  ${({last}) => last && `
    margin-left: auto;
  `}
`

export default List
