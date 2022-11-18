import PropTypes from "prop-types"

const ButtonOnClick = (props) => {
  //console.log("Button", props)
  return (
    <button onClick={() => props.onClick(props.value)}>
      {props.text}
    </button>
  )
}

ButtonOnClick.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const ButtonType = (props) => {
  //console.log(props)
  return (
    <div>
      <button type={props.type}>
        {props.text}
      </button>
    </div>
  )
}

ButtonType.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default {
  ButtonOnClick,
  ButtonType
}