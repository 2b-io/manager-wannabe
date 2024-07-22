import dateFormat from 'dateformat'
import ms from 'ms'
import React, {useState} from 'react'
import {
  FiEdit3,
  FiLock
} from "react-icons/fi"
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {createSelector} from 'reselect'

import DataTable from 'components/data-table'
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

  const [selectedTimelog, setSelectedTimelog] = useState(null)

  const columns = [{
    for: 'date',
    title: 'Date',
    transform: (data, row) => {
      const date = new Date(data)

      return dateFormat(date, 'yyyy/mm/dd')
    }
  }, {
    for: 'projectId',
    title: 'Project',
    transform: (data, row) => {
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
    <Grid fullWidth>
      <Text.PageTitle>Timesheet</Text.PageTitle>
      <DataTable
        keyField="_id"
        columns={columns}
        data={timelogs}
        rowActions={rowActions}
      />
      {selectedTimelog && (
        <Modal
          title="Edit timelog"
          component={(
            <TimelogForm
              projects={projects}
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
    </Grid>
  )
}

export default Timesheet
