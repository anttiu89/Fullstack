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
        return <div key={value.id}><Part partObject={value} /></div>;
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

const Course = (props) => {
  console.log(props)
  return (
    <div>
      <Header header={props.course.name} />
      <Content partObjectList={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App