import { useState } from 'react'

const all = (scoreObject) => {
  let allVariable = scoreObject.good + scoreObject.neutral + scoreObject.bad
  return allVariable
}

const average = (scoreObject) => {
  let goodScoreCount = scoreObject.good * 1
  let neutralScoreCount = scoreObject.neutral * 0
  let badScoreCount = scoreObject.bad * -1
  let allVariable = all(scoreObject)
  let averageVariable = 0
  if (allVariable > 0){
    averageVariable = (goodScoreCount + neutralScoreCount + badScoreCount) / allVariable
  }
  return averageVariable
}

const positive = (scoreObject) => {
  let allVariable = all(scoreObject)
  let positiveVariable = 0
  if (allVariable > 0){
    positiveVariable = ((scoreObject.good) / allVariable) * 100
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
  
  if (props.scoreObject.good === 0 && props.scoreObject.neutral === 0 && props.scoreObject.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value ={props.scoreObject} />
      <StatisticLine text="neutral" value ={props.scoreObject} />
      <StatisticLine text="bad" value ={props.scoreObject} />
      <StatisticLine text="all" value ={props.scoreObject} />
      <StatisticLine text="average" value ={props.scoreObject} />
      <StatisticLine text="positive" value ={props.scoreObject} />
    </div>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  
  if (props.text === "good") {
    return (
      <div>
        {props.text} {props.value.good}
      </div>
    )
  }

  if (props.text === "neutral") {
    return (
      <div>
        {props.text} {props.value.neutral}
      </div>
    )
  }

  if (props.text === "bad") {
    return (
      <div>
        {props.text} {props.value.bad}
      </div>
    )
  }

  if (props.text === "all") {
    return (
      <div>
        {props.text} {all(props.value)}
      </div>
    )
  }

  if (props.text === "average") {
    return (
      <div>
        {props.text} {average(props.value)}
      </div>
    )
  }

  if (props.text === "positive") {
    return (
      <div>
        {props.text} {positive(props.value)} %
      </div>
    )
  }

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const scoreObject = {
    good: good,
    neutral: neutral,
    bad: bad,
  }

  return (
    <div>
      <Header header={'give feedback'} />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header header={'statistics'} />
      <Statistics scoreObject={scoreObject} />
    </div>
  )
}

export default App