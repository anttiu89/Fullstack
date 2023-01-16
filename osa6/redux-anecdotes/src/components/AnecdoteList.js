/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const sortByVotesDescending = (a, b) => {
  if (a.votes > b.votes){
    return -1
  }
  if (a.votes < b.votes){
    return 1
  }
  return 0
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const unsortedAnecdotes = useSelector(( {anecdotes} ) => {
    return anecdotes
  })
  console.log("unsortedAnecdotes: ", unsortedAnecdotes)
  const filter = useSelector(( {filter} ) => {
    return filter
  })
  console.log("filter: ", filter)
  const filteredAnecdotes = unsortedAnecdotes.filter((anecdote) => {
    return filter.filter.length === 0 || filter.filter === null || anecdote.content.includes(filter.filter)
  })
  console.log("filteredAnecdotes: ", filteredAnecdotes)
  let sortedAnecdotes = [...filteredAnecdotes].sort(sortByVotesDescending)
  console.log("sortedAnecdotes: ", sortedAnecdotes)

  const vote = (anecdoteObject) => {
    console.log("Anecdote vote", anecdoteObject)
    dispatch(voteAnecdote(anecdoteObject))
    dispatch(setNotification(`you voted '${anecdoteObject.content}'`, 5))
  }

  return(
    <div>
      {sortedAnecdotes.map(anecdoteObject =>
        <div key={anecdoteObject.id}>
          <div>
            {anecdoteObject.content}
          </div>
          <div>
            has {anecdoteObject.votes}
            <button onClick={() => vote(anecdoteObject)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes