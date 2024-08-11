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
import {
  reducer as timelogReducer,
  saga as timelogSaga
} from './timelog'
import {
  reducer as uiReducer,
  saga as uiSaga
} from './ui'

const sagaMiddleware = createSagaMiddleware()

const safeFork = function* (fork) {
  try {
    yield fork()
  } catch (e) {
    console.error(e)
  }
}

export default configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({thunk: false}),
    sagaMiddleware
  ],
  reducer: {
    project: projectReducer,
    timelog: timelogReducer,
    ui: uiReducer
  }
})

sagaMiddleware.run(function* root() {
  yield all([
    safeFork(projectSaga),
    safeFork(timelogSaga),
    safeFork(uiSaga)
  ])
})
