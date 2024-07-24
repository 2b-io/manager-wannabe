import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  display: flex;
`

List.Item = styled(({last, ...props}) => <li {...props} />)`
  ${({last}) => last && `
    margin-left: auto;
  `}
`

export default List
