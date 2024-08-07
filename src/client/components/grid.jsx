import React from 'react'
import styled from 'styled-components'

const Grid = styled(
  ({fullWidth, loose, ...props}) => <div {...props} />
)`
  display: grid;
  
  ${({space}) => {
    switch (space) {
      case 'loose':
        return `grid-gap: 4rem;`
      case 'tight':
        return `grid-gap: 1rem;`
      default:
        return `grid-gap: 2rem;`
    }
  }}

  ${({fullWidth}) => fullWidth && `
    grid-template-columns: minmax(0, 1fr);
  ` || `
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `}

  & > * {
    min-width: 0;
  }
`

export default Grid
