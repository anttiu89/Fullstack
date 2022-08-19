import { useState } from 'react'

const all = (good, neutral, bad) => {
  let allVariable = good + neutral + bad
  return allVariable
}

const average = (good, neutral, bad) => {
  let goodScoreCount = good * 1
  let neutralScoreCount = neutral * 0
  let badScoreCount = bad * -1
  let allVariable = all(good, neutral, bad)
  let averageVariable = 0
  if (allVariable > 0){
    averageVariable = (goodScoreCount + neutralScoreCount + badScoreCount) / allVariable
  }
  return averageVariable
}

const positive = (good, neutral, bad) => {
  let allVariable = all(good, neutral, bad)
  let positiveVariable = 0
  if (allVariable > 0){
    positiveVariable = ((good) / allVariable) * 100
  }
  return round(positiveVariable)
}

const round = (number) => {
  const decimalPrecision = 10000000000000
  let roundedNumberVariable = Math.round(number * decimalPrecision) / decimalPrecision
  return roundedNumberVariable
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

const Statistics = (props) => {
  console.log(props)
  
  const allText = 'all'
  const averageText = 'average'
  const positiveText = 'positive'

  let allVariable = all(props.good, props.neutral, props.bad)
  let averageVariable = average(props.good, props.neutral, props.bad)
  let positiveVariable = positive(props.good, props.neutral, props.bad)

  return (
    <div>
      {props.goodText} {props.good}
      <br></br>
      {props.neutralText} {props.neutral}
      <br></br>
      {props.badText} {props.bad}
      <br></br>
      {allText} {allVariable}
      <br></br>
      {averageText} {averageVariable}
      <br></br>
      {positiveText} {positiveVariable} %
      <br></br>
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
      <Statistics good={good} goodText={goodText} neutral={neutral} neutralText={neutralText} bad={bad} badText={badText} />
    </div>
  )
}

export default App