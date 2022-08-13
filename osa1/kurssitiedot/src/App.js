const sum = (parts) => {
  let sumVariable = 0
  parts.forEach(value => {
    sumVariable += value.exercises
  })
  return sumVariable
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

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.partObjectList.map(value => {
        return <div key={value.name}><Part partObject={value} /></div>;
      })}
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
  let numberOfExercises = sum(props.partObjectList)
  return (
    <div>
      <p>
        Number of exercises {numberOfExercises} 
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header header={course} />
      <Content partObjectList={parts} />
      <Total partObjectList={parts} />
    </div>
  )
}

export default App