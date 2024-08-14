import {createSlice} from '@reduxjs/toolkit'
import {
  all,
  call,
  put,
  takeEvery
} from 'redux-saga/effects'

import {
  createTimelog,
  fetchTimelogs,
  updateTimelog
} from 'services/api'
import dayjs from 'services/day'

import actionCreatorFactory from './action-creator-factory'

const initialState = {
  timelogs: {},
  spentByDate: {}
}

const slide = createSlice({
  name: 'timelog',
  initialState,
  reducers: {
    add: (state, action) => {
      if (action.payload.clearBeforeAdd) {
        state.timelogs = {}
        state.spentByDate = {}
      }

      (action.payload.timelogs || []).forEach((timelog) => {
        state.timelogs[timelog._id] = timelog

        const dateStr = dayjs(new Date(timelog.date)).format('YYYYMMDD')

        state.spentByDate[dateStr] = (state.spentByDate[dateStr] || 0) + timelog.spentAsSeconds
      })
    }
  }
})

export const reducer = slide.reducer
export const actions = {
  ...slide.actions,
  // other actions that don't change state
  fetch: actionCreatorFactory(slide.name)('fetch')
}

// saga
export const saga = function* () {
  yield all([
    takeEvery(actions.fetch.type, function* (action) {
      const timelogs = yield call(fetchTimelogs)

      yield put(actions.add({
        timelogs,
        clearBeforeAdd: true
      }))
    })
  ])
}
