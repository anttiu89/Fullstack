import Blog from "./Blog"
import Button from "./Button"

const Blogs = (props) => {
  console.log(props)
  if (props.user === null) {
    return (null)
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{props.user.name} logged in <Button.ButtonOnClick onClick={props.handleLogoutClick} text={"logout"} value={props.user} /></p>
        {props.blogs.map(blog => {
          return (
            <div key={blog.id}>
              <Blog key={blog.id} blog={blog} />
            </div>)
        })}
      </div>
    )
  }
}

export default Blogs