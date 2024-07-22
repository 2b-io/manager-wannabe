import React from 'react'
import styled from 'styled-components'

const RowAction = styled.button`
  appearance: none;
  width: 3rem;
  height: 3rem;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`

const Wrapper = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  outline: 2px solid #ccc;
`

const Table = styled.table`
  line-height: 4rem;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`

Table.Header = styled.thead`
  & > tr > td {
    background: #ccc;
  }
`

Table.Body = styled.tbody`
`

Table.Row = styled.tr`
  &:nth-child(even) {
    background: whitesmoke;
  }
`

Table.Cell = styled(
  ({minimal, ...props}) => <td {...props} />
)`
  padding: 1rem;

  ${({minimal}) => minimal && `
    white-space: nowrap;
    text-align: right;
    width: 8rem;
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
            {columns.map((col) => <Table.Cell key={col.for}>{col.title}</Table.Cell>)}
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
                      const {icon, action} = actionCreator(row)

                      return (
                        <RowAction key={index} onClick={action}>{icon}</RowAction>
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
