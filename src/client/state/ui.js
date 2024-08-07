import {createSlice} from '@reduxjs/toolkit'
import {
  all,
  call,
  put,
  takeEvery
} from 'redux-saga/effects'
import ms from 'ms'

import {
  getProject,
  getProjectMeta,
  queryProjects,
  toggleStar,
  createTimelog,
  updateTimelog
} from 'services/api'
import hashService from 'services/hash'

import actionCreatorFactory from './action-creator-factory'
import {
  project as projectAction,
  timelog as timelogAction
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
  getProject: actionCreatorFactory(slide.name)('getProject'),
  getProjectMeta: actionCreatorFactory(slide.name)('getProjectMeta'),
  queryProjects: actionCreatorFactory(slide.name)('queryProjects'),
  createTimelog: actionCreatorFactory(slide.name)('createTimelog'),
  updateTimelog: actionCreatorFactory(slide.name)('updateTimelog')
}

// saga
export const saga = function* () {
  yield all([
    takeEvery(actions.queryProjects.type, function* (action) {
      const params = action.payload
      const hash = hashService.obj(params || {})

      const data = yield call(queryProjects, params)

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
    }),
    takeEvery(actions.getProject.type, function* (action) {
      const project = yield call(getProject, {
        id: action.payload.id
      })

      yield put(projectAction.add({
        projects: [project]
      }))
    }),
    takeEvery(actions.getProjectMeta.type, function* (action) {
      const data = yield call(getProjectMeta)

      yield put(projectAction.add({
        projects: data.projects
      }))
    }),
    takeEvery(actions.createTimelog.type, function* (action) {
      const timelog = yield call(createTimelog, action.payload)

      yield put(timelogAction.add({
        timelogs: [timelog]
      }))

      yield put(actions.getProject({
        id: timelog.projectId
      }))
    }),
    takeEvery(actions.updateTimelog.type, function* (action) {
      const timelog = yield call(updateTimelog, action.payload)

      yield put(timelogAction.add({
        timelogs: [timelog]
      }))

      yield put(actions.getProject({
        id: timelog.projectId
      }))
    })
  ])
}
