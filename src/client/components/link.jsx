import React from 'react'
import {
  Link as RouterLink
} from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(({to,...props}) => {
  if (to) {
    return <RouterLink to={to} {...props} />
  }

  return <a {...props} />
})`
`

export default Link
