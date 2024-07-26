import dateFormat from 'dateformat'
import ms from 'ms'
import React, {useState} from 'react'
import {
  FiEdit3,
  FiLock
} from "react-icons/fi"
import {useDispatch, useSelector} from 'react-redux'
import {useOutletContext} from 'react-router-dom'
import {createSelector} from 'reselect'

import Button from 'components/button'
import Card from 'components/card'
import DataTable from 'components/data-table'
import EmptyState from 'components/empty-state'
import Grid from 'components/grid'
import Modal from 'components/modal'
import Text from 'components/text'
import TimelogForm from 'components/timelog-form'

import {timelog} from 'state/actions'

const selector = createSelector([
  (state) => state.project.projects,
  (state) => state.timelog.timelogs
], (projects, timelogs) => ({
  projects,
  timelogs: Object.values(timelogs).sort((a, b) => new Date(b.date) - new Date(a.date))
}))

const Timesheet = () => {
  const {
    projects,
    timelogs
  } = useSelector(selector)
  const dispatch = useDispatch()
  const {user} = useOutletContext()

  const [selectedTimelog, setSelectedTimelog] = useState(null)
  const [showLogTime, setShowLogTime] = useState(false)

  const columns = [{
    for: 'date',
    title: 'Date',
    renderCell: (data, row) => {
      const date = new Date(data)

      return dateFormat(date, 'yyyy/mm/dd')
    }
  }, {
    for: 'projectId',
    title: 'Project',
    renderCell: (data, row) => {
      return projects[data]?.name
    }
  }, {
    for: 'spent',
    title: 'Spent'
  }, {
    for: 'workType',
    title: 'Work Type'
  }]

  const rowActions = [
    (row) => {
      const canEdit = row.forceUnlocked ||
        (new Date(row.date).getTime() + ms('7d') > Date.now())

      return canEdit ? ({
        icon: <FiEdit3 />,
        action: () => setSelectedTimelog(row)
      }) : ({
        icon: <FiLock />,
        disabled: true
      })
    }
  ]

  return (
    <Card loose>
      <Card.Header>
        <Text.PageTitle>Timesheet</Text.PageTitle>
      </Card.Header>
      <Card.Content>
        {timelogs.length > 0 && (
          <DataTable
            keyField="_id"
            columns={columns}
            data={timelogs}
            rowActions={rowActions}
          />
        ) || (
          <EmptyState>
            <Text>You don't have any timelog.</Text>
          </EmptyState>
        )}
        {selectedTimelog && (
          <Modal
            title="Edit timelog"
            component={(
              <TimelogForm
                project={projects[selectedTimelog.projectId]}
                initialData={selectedTimelog}
                onSubmit={(data) => {
                  dispatch(timelog.update(data))
                  setSelectedTimelog(null)
                }}
              />
            )}
            onCloseClick={() => setSelectedTimelog(null)}
            onOutsideClick={() => setSelectedTimelog(null)}
          />
        )}
      </Card.Content>
    </Card>
  )
}

export default Timesheet
