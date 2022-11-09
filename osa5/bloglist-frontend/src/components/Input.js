const Input = (props) => { 
  console.log(props)
  return (
    <div>
      {props.text} <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

export default Input