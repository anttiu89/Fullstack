import { useState } from 'react'
import Button from "./Button"

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenRemoveVisible = { display: removeVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewClick = (visible) => {
    setVisible(visible)
    setRemoveVisible(props.user.username === props.blog.user.username)
  }

  console.log(props)
  return (
  <div>
    <div style={hideWhenVisible}>
      <div style={blogStyle}>
        {props.blog.title} {props.blog.author} <Button.ButtonOnClick onClick={handleViewClick} text={"view"} value={true} />
      </div>
    </div>
    <div style={showWhenVisible}>
      <div style={blogStyle}>
        <div>{props.blog.title} {props.blog.author} <Button.ButtonOnClick onClick={handleViewClick} text={"hide"} value={false} /></div>
        <div>{props.blog.url}</div>
        <div>{props.blog.likes} <Button.ButtonOnClick onClick={props.handleLikeClick} text={"like"} value={props.blog} /></div> 
        <div>{props.blog.user.name}</div>
        <div style={showWhenRemoveVisible}>
          <Button.ButtonOnClick onClick={props.handleRemoveClick} text={"remove"} value={props.blog} />
        </div>
      </div>
    </div>
  </div>  
  )
}

export default Blog