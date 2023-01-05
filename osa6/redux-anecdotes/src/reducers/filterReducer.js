import { createSlice } from '@reduxjs/toolkit'

const initialState = { filter: "" }

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      console.log('state filter create now: ', state.filter)
      console.log('action', action)
      const filter = action.payload
      state.filter = filter
      console.log('state notification create end: ', state.filter)
    },
  },
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer