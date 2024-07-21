import {createSlice} from '@reduxjs/toolkit'
import {
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
      (action.payload.projects || []).forEach((project) => {
        state.projects[project.id] = project
      })
    }
  }
})

export const reducer = slide.reducer
export const actions = {
  ...slide.actions,
  // other actions that don't change state
  fetchProjects: actionCreatorFactory('project/fetchProjects')
}

// saga
export const saga = function* () {
  yield takeEvery(actions.fetchProjects.type, function* (action) {
    const projects = yield call(fetchProjects)

    yield put(actions.add({projects}))
  })
}
