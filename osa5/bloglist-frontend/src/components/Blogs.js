import { forwardRef } from "react"
import Blog from "./Blog"
import Button from "./Button"
import FormCreateBlog from "./FormCreateBlog"
import Togglable from "./Togglable"
import PropTypes from "prop-types"

const Blogs = forwardRef((props, ref) => {
  console.log(props)

  if (props.user === null) {
    return (null)
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{props.user.name} logged in <Button.ButtonOnClick id="Logout" onClick={props.handleLogoutClick} text={"logout"} value={props.user} /></p>
        <h2>create new</h2>
        <Togglable buttonLabel="create new blog" ref={ref}>
          <FormCreateBlog createBlog={props.createBlog}/>
        </Togglable>
        {props.blogs.map(blog => {
          return (
            <div key={blog.id}>
              <Blog blog={blog} handleLikeClick={props.handleLikeClick} handleRemoveClick={props.handleRemoveClick} user={props.user} />
            </div>)
        })}
      </div>
    )
  }
})

Blogs.displayName = "Blogs"

Blogs.propTypes = {
  handleLogoutClick: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default Blogs