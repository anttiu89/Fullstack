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

export default Login