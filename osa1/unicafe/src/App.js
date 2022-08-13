import { useState } from 'react'

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

const Statistics = (props) => {
  console.log(props)
  return (
    <div>
      {props.text} {props.score}
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={'give feedback'} />
      <Button handleClick={handleGoodClick} text={goodText} />
      <Button handleClick={handleNeutralClick} text={neutralText} />
      <Button handleClick={handleBadClick} text={badText} />
      <Header header={'statistics'} />
      <Statistics text={goodText} score={good} />
      <Statistics text={neutralText} score={neutral} />
      <Statistics text={badText} score={bad} />
    </div>
  )
}

export default App