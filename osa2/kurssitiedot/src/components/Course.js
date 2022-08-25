const sumForEach = (parts) => {
  let sumVariable = 0
  parts.forEach(value => {
    sumVariable += value.exercises
  })
  return sumVariable
}

const sumArrayReduce = (parts) => {
  const initialValue = 0
  let sumVariable = parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises 
  }, initialValue)
  return sumVariable
}

const Header2 = (props) => {
  console.log(props)
  return (
    <div>
      <h2>
        {props.header}
      </h2>
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
  let numberOfExercises = sumArrayReduce(props.partObjectList)
  return (
    <div>
      <b>
        total of {numberOfExercises} exercises
      </b>
    </div>
  )
}

const Course = (props) => {
    console.log(props)
    return (
      <div>
        <Header2 header={props.course.name} />
        <Content partObjectList={props.course.parts} />
        <Total partObjectList={props.course.parts} />
      </div>
    )
  }

  export default Course