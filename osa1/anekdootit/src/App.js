import { useState } from 'react'

const getGreatestValueIndexFromIntArray = (intArray) => {
  let greatestValue = 0
  let greatestValueIndex = 0
  
  for (let i = 0; i < intArray.length; i++) {
    if (greatestValue < intArray[i]) {
      greatestValue = intArray[i]
      greatestValueIndex = i
    }
  }
  return greatestValueIndex
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}

const Button = (props) => { 
  console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [anecdoteVoteArray, setAnecdoteVoteArray] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0))

  const handleSelectedClick = () => {
    setSelected(getRandomInt(0, anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...anecdoteVoteArray]
    copy[selected] += 1
    setAnecdoteVoteArray(copy)
  }

  const greatestValueIndex = getGreatestValueIndexFromIntArray(anecdoteVoteArray) 

  return (
    <div>
      <Header header={"Anecdote of the day"} />
      {anecdotes[selected]}
      <br></br>
      has {anecdoteVoteArray[selected]} votes
      <br></br>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleSelectedClick} text="next anecdote" />
      <Header header={"Anecdote with most votes"} />
      {anecdotes[greatestValueIndex]}
    </div>
  )
}

export default App