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

const Table = styled.table`
  line-height: 3rem;
  border-collapse: collapse;
  border-style: hidden;
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

const Wrapper = styled(({border, ...props}) => <div {...props} />)`
  border-radius: 1rem;
  overflow: hidden;
  outline: 2px solid whitesmoke;

  ${({border}) => border && `
    ${Table.Cell} {
      border: 1px solid whitesmoke;
    }
  `}
`

const DataTable = ({
  border,
  columns,
  keyField,
  data,
  rowActions = []
}) => {
  return (
    <Wrapper border={border}>
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.Cell key={col.for}>
                {col.renderHeader ? col.renderHeader(col) : col.title}
              </Table.Cell>
            ))}
            {rowActions.length && (<Table.Cell minimal />) || null}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => {
            return (
              <Table.Row key={row[keyField]}>
                {columns.map((col) => (
                    <Table.Cell key={col.for}>
                      {col.renderCell ? col.renderCell(row[col.for], row, col) : row[col.for]}
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
                ) || null}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Wrapper>
  )
}

export default DataTable
