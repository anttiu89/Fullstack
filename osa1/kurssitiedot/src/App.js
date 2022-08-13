const Header = (props) => {
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partName={props.partName1} numberOfExercisesPart={props.numberOfExercisesPart1} />
      <Part partName={props.partName2} numberOfExercisesPart={props.numberOfExercisesPart2} />
      <Part partName={props.partName3} numberOfExercisesPart={props.numberOfExercisesPart3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.partName} {props.numberOfExercisesPart}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.numberOfExercisesPart1 + props.numberOfExercisesPart2 + props.numberOfExercisesPart3} 
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header header={course} />
      <Content partName1={part1} numberOfExercisesPart1={exercises1} partName2={part2} numberOfExercisesPart2={exercises2} partName3={part3} numberOfExercisesPart3={exercises3} />
      <Total numberOfExercisesPart1={exercises1} numberOfExercisesPart2={exercises2} numberOfExercisesPart3={exercises3} />
    </div>
  )
}

export default App