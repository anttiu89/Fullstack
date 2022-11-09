import { useState } from 'react'
import Blog from "./Blog"
import Button from "./Button"
import FormCreateBlog from "./FormCreateBlog"
import Togglable from "./Togglable"

const Blogs = (props) => {
  console.log(props)

  if (props.user === null) {
    return (null)
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{props.user.name} logged in <Button.ButtonOnClick onClick={props.handleLogoutClick} text={"logout"} value={props.user} /></p>
        <h2>create new</h2>
        <Togglable buttonLabel="create new blog">
          <FormCreateBlog createBlog={props.createBlog}/>
        </Togglable>
        {props.blogs.map(blog => {
          return (
            <div key={blog.id}>
              <Blog blog={blog} />
            </div>)
        })}
      </div>
    )
  }
}

export default Blogs