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

import actionCreatorFactory from './action-creator-factory'

const initialState = {
  timelogs: {}
}

const slide = createSlice({
  name: 'timelog',
  initialState,
  reducers: {
    add: (state, action) => {
      (action.payload.timelogs || []).forEach((timelog) => {
        state.timelogs[timelog._id] = timelog
      })
    }
  }
})

export const reducer = slide.reducer
export const actions = {
  ...slide.actions,
  // other actions that don't change state
  create: actionCreatorFactory(slide.name)('create'),
  fetch: actionCreatorFactory(slide.name)('fetch'),
  update: actionCreatorFactory(slide.name)('update'),
}

// saga
export const saga = function* () {
  yield all([
    takeEvery(actions.create.type, function* (action) {
      const timelog = yield call(createTimelog, action.payload)

      yield put(actions.add({
        timelogs: [timelog]
      }))
    }),
    takeEvery(actions.fetch.type, function* (action) {
      const timelogs = yield call(fetchTimelogs)

      yield put(actions.add({
        timelogs
      }))
    }),
    takeEvery(actions.update.type, function* (action) {
      const timelog = yield call(updateTimelog, action.payload)

      yield put(actions.add({
        timelogs: [timelog]
      })) 
    })
  ])
}
