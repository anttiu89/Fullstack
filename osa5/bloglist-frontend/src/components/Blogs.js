import { useState, useRef, forwardRef } from 'react'
import Blog from "./Blog"
import Button from "./Button"
import FormCreateBlog from "./FormCreateBlog"
import Togglable from "./Togglable"

const Blogs = forwardRef((props, ref) => {
  console.log(props)

  if (props.user === null) {
    return (null)
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{props.user.name} logged in <Button.ButtonOnClick onClick={props.handleLogoutClick} text={"logout"} value={props.user} /></p>
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

export default Blogs