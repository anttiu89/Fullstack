const Message = (props) => {
  console.log(props)
  if (props.message === null || props.message.message === null) {
    return null
  }

  let classNameCss = "message"
  if (props.message.isError === true) {
    classNameCss = "errorMessage"
  }
  
  return (
    <div className={classNameCss}>
      {props.message.message}
    </div>
  )
}

export default Message