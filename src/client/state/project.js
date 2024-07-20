import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  projects: {
    'abc': {
      name: 'CW'
    },
    'xxx': {
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

export const actions = slide.actions
export const reducer = slide.reducer
