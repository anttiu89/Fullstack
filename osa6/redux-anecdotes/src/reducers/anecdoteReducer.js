import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const initialState = []

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      let stateObjectAnecdotes = (state)
      console.log("appendAnecdote", action)
      const anecdote = action.payload
      console.log("anecdote", anecdote)
      stateObjectAnecdotes.push(anecdote)
    },
    setVote(state, action) {
      let stateObjectAnecdotes = (state)
      console.log("VoteIncreaser", action)
      const anecdoteObject = action.payload
      let anecdote = stateObjectAnecdotes.find(a => a.id === anecdoteObject.id)
      anecdote.votes++
    },
    setAnecdotes(state, action) {
      console.log("setAnecdotes", action)
      const anecdotes = action.payload
      console.log("anecdotes", anecdotes)
      return anecdotes
    },
  }
})

export const { appendAnecdote, setVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    console.log("initializeAnecdotes")
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    console.log("createAnecdote")
    const newAnecdoteObject = { content: content, id: getId(), votes: 0 }
    const newAnecdote = await anecdoteService.create(newAnecdoteObject)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    console.log("voteAnecdote", anecdote)
    let anecdoteObject = { ...anecdote }
    anecdoteObject.votes++
    console.log("voteAnecdote", anecdoteObject)
    const updatedAnecdote = await anecdoteService.update(anecdoteObject.id, anecdoteObject)
    dispatch(setVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer