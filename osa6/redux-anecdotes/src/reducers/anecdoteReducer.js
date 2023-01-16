import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      let stateObjectAnecdotes = (state)
      console.log('CreateAnecdote', action)
      const anecdote = action.payload
      console.log('anecdote', anecdote)
      stateObjectAnecdotes.push(anecdote)
    },
    voteIncreaser(state, action) {
      let stateObjectAnecdotes = (state)
      console.log('VoteIncreaser', action)
      const id = action.payload
      let anecdote = stateObjectAnecdotes.find(a => a.id === id)
      anecdote.votes++
    },
    initializeAnecdotes(state, action) {
      console.log('InitializeAnecdotes', action)
      const anecdotes = action.payload
      console.log('anecdotes', anecdotes)
      return anecdotes
    },
  }
})

export const { createAnecdote, voteIncreaser, initializeAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer