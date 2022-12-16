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

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const unsortedAnecdotes = useSelector(({ anecdotes }) => {
    return anecdotes
  })
  const anecdotes = unsortedAnecdotes.sort(sortByVotesDescending)

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(voteIncreaser(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default Anecdotes