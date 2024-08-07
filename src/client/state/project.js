import {createSlice} from '@reduxjs/toolkit'
import {
  all,
  call,
  put,
  takeEvery
} from 'redux-saga/effects'
import shortHash from 'short-hash'

import {
  fetchProjects,
  toggleStar
} from 'services/api'
import hash from 'services/hash'

import actionCreatorFactory from './action-creator-factory'

const initialState = {
  projects: {},
  queries: {}
}

const slide = createSlice({
  name: 'project',
  initialState,
  reducers: {
    add: (state, action) => {
      (action.payload.projects || []).forEach((project) => {
        state.projects[project._id] = {
          ...(state.projects[project._id] || {}),
          ...project
        }
      })
    },
    updateStar: (state, action) => {
      const {projectId, starred} = action.payload

      if (state.projects[projectId]) {
        state.projects[projectId].starred = starred
      }

      Object.values(state.queries).forEach((projects) => {
        projects.forEach((project) => {
          if (project._id === projectId) {
            project.starred = starred
          }
        })
      })
    },
    cacheQuery: (state, action) => {
      const {hash, projects} = action.payload

      state.queries[hash] = projects
    }
  }
})

export const reducer = slide.reducer
export const actions = {
  ...slide.actions,
  // other actions that don't change state
  fetch: actionCreatorFactory(slide.name)('fetch'),
  toggleStar: actionCreatorFactory(slide.name)('toggleStar')
}

// saga
export const saga = function* () {
  yield all([
    // takeEvery(actions.fetch.type, function* (action) {
    //   const params = action.payload
    //   const projects = yield call(fetchProjects, params)

    //   yield put(actions.add({
    //     projects
    //   }))

    //   yield put(actions.cacheQuery({
    //     hash: hash.obj(params || {}),
    //     projects
    //   }))
    // }),
    takeEvery(actions.toggleStar.type, function* (action) {
      const {projectId, refetch} = action.payload
      const starState = yield call(toggleStar, projectId)

      yield put(actions.updateStar(starState))

      // if (refetch) {
      //   yield put(actions.fetch(refetch))
      // }
    })
  ])
}
