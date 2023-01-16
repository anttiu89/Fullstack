import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from "./services/anecdotes"
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const data = await anecdoteService.getAll()
      dispatch(initializeAnecdotes(data))
    }

    try {
      fetchData()
    } catch (exception) {
      console.log(exception)
    }
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App