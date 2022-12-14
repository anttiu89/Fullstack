import PropTypes from "prop-types"

const Input = (props) => {
  //console.log(props)
  return (
    <div>
      {props.text} <input id={props.id} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
    </div>
  )
}

Input.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Input