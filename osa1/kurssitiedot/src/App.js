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

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part partObject={props.partObject1} />
      <Part partObject={props.partObject2} />
      <Part partObject={props.partObject3} />
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.partObject.name} {props.partObject.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header header={course} />
      <Content partObject1={part1} partObject2={part2} partObject3={part3} />
      <Total numberOfExercisesPart1={part1.exercises} numberOfExercisesPart2={part2.exercises} numberOfExercisesPart3={part3.exercises} />
    </div>
  )
}

export default App