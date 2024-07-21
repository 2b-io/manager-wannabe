import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;

  ${({fullwidth}) => fullwidth && `
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
