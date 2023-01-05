import { useDispatch, useSelector } from 'react-redux'
import { voteIncreaser } from '../reducers/anecdoteReducer'

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
  const fullState = useSelector(state => state)
  console.log("State_a", fullState)
  const anecdotes = fullState.anecdotes
  console.log("anec: ", anecdotes)
  anecdotes.sort((a, b) => b.votes - a.votes)
  console.log("anec sort: ", anecdotes)

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    console.log("Anecdote", anecdote)
    dispatch(voteIncreaser(anecdote.id))
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes