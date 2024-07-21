import {
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'

import {
  reducer as projectReducer,
  saga as projectSaga
} from './project'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({thunk: false}),
    sagaMiddleware
  ],
  reducer: {
    project: projectReducer
  }
})

sagaMiddleware.run(function* root() {
  yield all([
    projectSaga()
  ])
})
