import {createSlice} from '@reduxjs/toolkit'
import {takeEvery} from 'redux-saga/effects'

import actionCreatorFactory from './action-creator-factory'

const initialState = {
  projects: {
    0: {
      id: 0,
      name: 'CW'
    },
    1: {
      id: 1,
      name: 'BodyFriend'
    }
  }
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
    console.log(action)
  })
}
