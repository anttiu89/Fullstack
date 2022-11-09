const ButtonOnClick = (props) => { 
  console.log("Button", props)
  return (
    <button onClick={() => props.onClick(props.value)}>
      {props.text}
    </button>
  )
}

const ButtonType = (props) => { 
  console.log(props)
  return (
    <div>
      <button type={props.type}>
        {props.text}
      </button>
    </div>
  )
}

export default { 
  ButtonOnClick,
  ButtonType
}