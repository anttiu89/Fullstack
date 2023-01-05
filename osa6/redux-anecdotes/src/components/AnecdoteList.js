import { useDispatch, useSelector } from 'react-redux'
import { voteIncreaser } from '../reducers/anecdoteReducer'

const sortByVotesDescending = (a, b) => {
  // console.log("Anecdote a :", a)
  // console.log("Anecdote b :", b)
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
    return anecdotes;
  })
  console.log("unsortedAnecdotes: ", unsortedAnecdotes)
  // let sortedAnecdotes = [...unsortedAnecdotes].sort(sortByVotesDescending)
  let sortedAnecdotes = unsortedAnecdotes
  console.log("sortedAnecdotes: ", sortedAnecdotes)

  const vote = (anecdoteObject) => {
    console.log("Anecdote vote", anecdoteObject)
    dispatch({ type: 'anecdotes/voteIncreaser', payload: anecdoteObject.id })
    //dispatch(voteIncreaser(anecdoteObject.id))
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