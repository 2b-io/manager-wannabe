import {createSlice} from '@reduxjs/toolkit'
import {
  all,
  call,
  put,
  takeEvery
} from 'redux-saga/effects'
import ms from 'ms'

import {
  fetchProjects,
  toggleStar
} from 'services/api'
import hashService from 'services/hash'

import actionCreatorFactory from './action-creator-factory'
import {
  project as projectAction
} from './actions'

const initialState = {
  dataBindings: {}
}

const slide = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    bindData: (state, action) => {
      const {hash, expiry, data, type} = action.payload

      state.dataBindings[hash] = {
        data,
        expiry,
        type
      }
    }
  }
})

export const reducer = slide.reducer
export const actions = {
  ...slide.actions,
  fetchProjects: actionCreatorFactory(slide.name)('fetchProjects'),
}

// saga
export const saga = function* () {
  yield all([
    takeEvery(actions.fetchProjects.type, function* (action) {
      const params = action.payload
      const hash = hashService.obj(params || {})

      const data = yield call(fetchProjects, params)

      yield put(projectAction.add({
        projects: data.projects
      }))

      yield put(actions.bindData({
        hash,
        expiry: Date.now() + ms('3m'),
        data: {
          ids: data.projects.map((project) => project._id),
          params: data.params,
          total: data.total
        }
      }))
    })
  ])
}
