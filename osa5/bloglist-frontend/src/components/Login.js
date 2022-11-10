import PropTypes from "prop-types"

const Login = (props) => {
  console.log(props)
  if (props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={props.handleLogin}>
          <div>
            username
            <input
              type="text"
              value={props.username}
              onChange={props.handleUsernameChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={props.password}
              onChange={props.handlePasswordChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (null)
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login