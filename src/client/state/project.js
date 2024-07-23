import {createSlice} from '@reduxjs/toolkit'
import {
  all,
  call,
  put,
  takeEvery
} from 'redux-saga/effects'

import {fetchProjects} from 'services/api'

import actionCreatorFactory from './action-creator-factory'

const initialState = {
  projects: {}
}

const slide = createSlice({
  name: 'project',
  initialState,
  reducers: {
    add: (state, action) => {
      if (action.payload.clearBeforeAdd) {
        state.projects = {}
      }

      (action.payload.projects || []).forEach((project) => {
        state.projects[project._id] = project
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
      const projects = yield call(fetchProjects)

      yield put(actions.add({
        projects,
        clearBeforeAdd: true
      }))
    })
  ])
}
