import React from 'react'
import styled from 'styled-components'

const Grid = styled(
  ({fullWidth, loose, ...props}) => <div {...props} />
)`
  display: grid;
  ${({loose}) => loose ? `
    grid-gap: 4rem;
  ` : `
    grid-gap: 2rem;
  `}
  

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
