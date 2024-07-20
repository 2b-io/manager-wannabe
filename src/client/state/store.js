import { configureStore } from '@reduxjs/toolkit'

import {reducer as projectReducer} from './project'

export default configureStore({
  reducer: {
    project: projectReducer
  }
})
