import {createSlice} from '@reduxjs/toolkit'

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

export const actions = slide.actions
export const reducer = slide.reducer
