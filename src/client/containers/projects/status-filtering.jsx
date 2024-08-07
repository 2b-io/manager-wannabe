import React from 'react'
import styled from 'styled-components'

import {
  FiCheckCircle,
  FiCircle
} from 'react-icons/fi'

import List from 'components/list'

const StatusList = styled(List)`
  flex-wrap: wrap;
`

const StatusBadge = styled.div`
  whitespace: nowrap;
  display: inline-flex;
  grid-gap: 1rem;
  outline: 2px solid whitesmoke;
  padding: 1rem;
  border-radius: 1rem;

  ${({selected}) => {

  }}
`

const StatusFiltering = ({
  selected,
  all,
  onSelect
}) => {
  return (
    <StatusList space="loose">
      {all.map((status) => {
        const isSelected = selected.indexOf(status) > -1

        return (
          <List.Item key={status} onClick={() => onSelect(status)}>
            <StatusBadge>
              {isSelected && (
                <FiCheckCircle />
              ) || (
                <FiCircle />
              )}
              {status}
              
            </StatusBadge>
          </List.Item>
        )
      })}
    </StatusList>
  )
}

export default React.memo(StatusFiltering)
