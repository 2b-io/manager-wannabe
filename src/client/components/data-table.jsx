import React from 'react'
import styled from 'styled-components'

import Text from 'components/text'

const RowAction = styled.button`
  appearance: none;
  width: 3rem;
  height: 3rem;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  ${({disabled}) => disabled ? `
    cursor: not-allowed;
  ` : `
    cursor: pointer;
  `}
`

const Wrapper = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  outline: 2px solid whitesmoke;
`

const Table = styled.table`
  line-height: 3rem;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`

Table.Header = styled.thead`
  & > tr > td {
    background: whitesmoke;
  }
`

Table.Body = styled.tbody`
`

Table.Row = styled.tr`
`

Table.Cell = styled(
  ({minimal, ...props}) => <td {...props} />
)`
  padding: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({minimal}) => minimal && `
    white-space: nowrap;
    text-align: center;
    width: 5rem;
    padding: 0;
  `}
`

const DataTable = ({
  columns,
  keyField,
  data,
  rowActions = []
}) => {
  return (
    <Wrapper>
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.Cell key={col.for}>
                {col.title}
              </Table.Cell>
            ))}
            {rowActions.length && (<Table.Cell minimal />)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => {
            return (
              <Table.Row key={row[keyField]}>
                {columns.map((col) => (
                    <Table.Cell key={col.for}>
                      {col.transform ? col.transform(row[col.for], row) : row[col.for]}
                    </Table.Cell>
                ))}
                {rowActions.length && (
                  <Table.Cell minimal>
                    {rowActions.map((actionCreator, index) => {
                      const data = actionCreator(row)

                      if (!data) {
                        return null
                      }

                      const {icon, action, disabled} = data

                      return (
                        <RowAction
                          key={index}
                          onClick={action}
                          disabled={disabled}>
                          {icon}
                        </RowAction>
                      )
                    })}
                  </Table.Cell>
                )}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Wrapper>
  )
}

export default DataTable
